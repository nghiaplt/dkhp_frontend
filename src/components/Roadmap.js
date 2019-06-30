import React from 'react';
import Konva from 'konva';
import $ from 'jquery';

class Roadmap extends React.Component {
    constructor(props) {
        super(props);
        this.padding = 100;
        this.radius = 20;
        this.firstline = 60;
        this.distanceBetweenLayer = 300;
        this.distanceBetweenNode = 80;
        this.startX = 100;
        this.startY = 20;
        this.isRender = [];
        this.level = [];
        this.layer = {}
        this.stage = {};
        this.linesHover = [];
        this.tooltipsHover = [];
        this.circles = [];
        this.subjects = [
        ];
        this.lines = []
        this.state = {

        };
    }
    componentDidMount() {
        this.getRoadmap();

    }
    getRoadmap() {
        window.axios.get(window.API + '/roadmap').then(result => {
            if (result.data.success) {
                this.subjects = result.data.data;
                this.stage = this.initStage();
                this.layer = this.initLayer();
                this.generateTienquyet(this.subjects, this.startX, this.startY, null, 0);
                this.draw(this.subjects);
                this.drawAnnotation();

                this.addLayerToStage();
            }
        })
    }
    drawAnnotation() {
        var line = this.createLine([-90, -80, -50, -80], "blue", 5)
        var tienquyet = new Konva.Text({
            x: 70,
            y: 10,
            text: 'Môn tiên quyết (phải học)',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'blue'
        });
        var line1 = this.createLine([-90, -40, -50, -40], "yellow", 5)
        var cothehoc = new Konva.Text({
            x: 70,
            y: 50,
            text: 'Môn có thể học',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'yellow'
        });
        this.addNodeToLayer(line);
        this.addNodeToLayer(tienquyet);
        this.addNodeToLayer(line1);
        this.addNodeToLayer(cothehoc);
    }
    drawBackLines(subject) {
        for (let i = 0; i < subject.cothehoc.length; i++) {
            if (subject.cothehoc[i] != null) {
                var newLine = this.linesHover.find(line => line.attrs.id1 == subject.cothehoc[i].id && line.attrs.id2 == subject.id);
                if (newLine !== undefined) continue;
                var line = this.createLineFromCircleToCircle(subject.cothehoc[i].x, subject.cothehoc[i].y, subject.x, subject.y,
                    'yellow', 5, subject.cothehoc[i].id, subject.id);
                this.linesHover = [...this.linesHover, line];
                this.addNodeToLayer(line);
                this.drawBackLines(subject.cothehoc[i]);
            }
        }
        this.addLayerToStage();
    }
    drawNexLines(subject) {
        for (let i = 0; i < subject.tienquyet.length; i++) {
            if (subject.tienquyet[i] != null) {
                var newLine = this.linesHover.find(line => line.attrs.id1 == subject.id && line.attrs.id2 == subject.tienquyet[i].id);
                if (newLine !== undefined) continue;
                var line = this.createLineFromCircleToCircle(subject.x, subject.y, subject.tienquyet[i].x, subject.tienquyet[i].y,
                    'blue', 5, subject.id, subject.tienquyet[i].id);
                this.linesHover = [...this.linesHover, line];
                this.addNodeToLayer(line);
                this.drawNexLines(subject.tienquyet[i]);
            }
        }
        this.addLayerToStage();
    }
    drawBackTooltips(subject) {
        for (let i = 0; i < subject.cothehoc.length; i++) {
            if (subject.cothehoc[i] != null) {
                var newTooltip = this.tooltipsHover.find(tooltip => tooltip.attrs.id === subject.cothehoc[i].id);
                if (newTooltip !== undefined) continue;
                var tooltip = this.createToolTip(subject.cothehoc[i].ten, subject.cothehoc[i].x, subject.cothehoc[i].y - this.radius / 2, subject.cothehoc[i].id);
                this.tooltipsHover = [...this.tooltipsHover, tooltip];
                this.addNodeToLayer(tooltip);
                this.drawBackTooltips(subject.cothehoc[i]);
            }
        }
        this.addLayerToStage();
    }
    drawNextTooltips(subject) {
        for (let i = 0; i < subject.tienquyet.length; i++) {
            if (subject.tienquyet[i] != null) {
                var newTooltip = this.tooltipsHover.find(tooltip => tooltip.attrs.id === subject.tienquyet[i].id);
                if (newTooltip !== undefined) continue;
                var tooltip = this.createToolTip(subject.tienquyet[i].ten, subject.tienquyet[i].x, subject.tienquyet[i].y - this.radius / 2, subject.tienquyet[i].id);
                this.tooltipsHover = [...this.tooltipsHover, tooltip];
                this.addNodeToLayer(tooltip);
                this.drawNextTooltips(subject.tienquyet[i]);
            }
        }
        this.addLayerToStage();
    }
    mouseOver(id) {
        this.stage.container().style.cursor = 'pointer';
        var subject = this.isRender.find(subject => subject.id === id);
        this.drawBackLines(subject);
        this.drawNexLines(subject);

        var tooltip = this.createToolTip(subject.ten, subject.x, subject.y - this.radius / 2);
        this.tooltipsHover = [...this.tooltipsHover, tooltip];
        this.addNodeToLayer(tooltip);
        this.selectedCircle = this.createCircle(subject.x, subject.y, subject.id, 'pink');
        this.addNodeToLayer(this.selectedCircle);
        this.addLayerToStage();


        this.drawBackTooltips(subject);
        this.drawNextTooltips(subject);
    }
    mouseOut(id) {
        this.stage.container().style.cursor = 'default';
        this.linesHover.forEach(line => {
            line.destroy();
        })
        this.tooltipsHover.forEach(tooltip => {
            tooltip.destroy();
        })
        this.selectedCircle.destroy();
        this.linesHover = [];
        this.tooltipsHover = [];
    }
    drawCircles(subjects) {
        for (let i = 0; i < subjects.length; i++) {
            var newcircle = this.circles.find(item => item.attrs.id == subjects[i].id);
            if (newcircle !== undefined) continue;
            var circle = this.createCircle(subjects[i].x, subjects[i].y, subjects[i].id);
            this.circles = [...this.circles, circle];
            this.addNodeToLayer(circle);
            this.drawCircles(subjects[i].tienquyet);
        }
    }
    drawLines(subjects) {
        for (let i = 0; i < subjects.length; i++) {
            for (let j = 0; j < subjects[i].tienquyet.length; j++) {
                var newline = this.lines.find(item => item.attrs.id1 == subjects[i].id && item.attrs.id2 == subjects[i].tienquyet[j].id);
                if (newline !== undefined) continue;
                var line = this.createLineFromCircleToCircle(subjects[i].x, subjects[i].y, subjects[i].tienquyet[j].x, subjects[i].tienquyet[j].y,
                    'black', 1, subjects[i].id, subjects[i].tienquyet[j].id);
                this.lines = [...this.lines, line];
                this.addNodeToLayer(line);
            }
            this.drawLines(subjects[i].tienquyet);
        }
    }
    draw(subjects) {
        this.drawCircles(subjects);
        this.drawLines(subjects);
    }
    generateTienquyet(subjects, x, y, parent, e) {
        for (let i = 0; i < subjects.length; i++) {
            subjects[i].cothehoc = [];
            var renderedSubject = this.isRender.find(rendered => rendered.id === subjects[i].id)
            if (renderedSubject !== undefined) {
                subjects[i] = renderedSubject;
            }
            else {
                this.level[e] = this.level[e] ? this.level[e] + this.distanceBetweenNode : this.startY;
                subjects[i].x = x;
                subjects[i].y = this.level[e];

                this.isRender = [...this.isRender, subjects[i]];
            }
            subjects[i].cothehoc = [...subjects[i].cothehoc, parent]

            this.generateTienquyet(subjects[i].tienquyet, x + this.distanceBetweenLayer, y, subjects[i], e + 1);
        }
    }
    initStage() {
        // first we need to create a stage
        var width = $("#container").width() + 1000;
        var height = $("#container").height() + 1000;

        return new Konva.Stage({
            container: 'container',
            width: width,
            height: height
        });
    }
    initLayer() {
        return new Konva.Layer();
    }
    createCircle(x, y, id, color) {
        if (!color) color = 'red';
        var circle = new Konva.Circle({
            x: this.padding + x,
            y: this.padding + y,
            radius: this.radius,
            fill: color,
            stroke: 'black',
            strokeWidth: 2,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: { x: 10, y: 10 },
            shadowOpacity: 0.5,
            id: id
        });
        circle.on('mouseenter', event => {
            this.mouseOver(event.target.attrs.id);
        })
        circle.on('mouseleave', event => {
            this.mouseOut(event.target.attrs.id);
        })
        return circle;
    }
    createLine(points, color, stroke, zIndex, id1, id2) {
        let new_points = points.map(point => point + this.padding);
        return new Konva.Line({
            points: new_points,
            stroke: color,
            strokeWidth: stroke,
            lineCap: 'round',
            lineJoin: 'round',
            // zIndex: zIndex
            id1: id1,
            id2: id2
        });
    }
    createToolTip(text, x, y, id) {
        var tooltip = new Konva.Label({
            x: this.padding + x,
            y: this.padding + y,
            opacity: 0.75,
            id: id
        });

        tooltip.add(
            new Konva.Tag({
                fill: 'black',
                pointerDirection: 'down',
                pointerWidth: 10,
                pointerHeight: 10,
                lineJoin: 'round',
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffset: { x: 10, y: 5 },
                shadowOpacity: 0.5
            })
        );

        tooltip.add(
            new Konva.Text({
                text: text,
                fontFamily: 'Calibri',
                fontSize: 18,
                padding: 5,
                fill: 'white'
            })
        );
        return tooltip
    }
    addNodeToLayer(node) {
        this.layer.add(node);
    }
    addLayerToStage() {
        this.stage.add(this.layer);
    }
    createLineFromCircleToCircle(x1, y1, x2, y2, color, stroke, id1, id2) {
        var distanceY = y2 - y1;
        if (color === undefined) color = "black";
        if (stroke === undefined) stroke = 1;
        var zIndex = 0;
        if (x1 < x2) {
            return this.createLine([x1 + this.radius, y1, x1 + this.firstline + this.radius, y1, x1 + this.firstline + this.radius, y1 + distanceY, x2 - this.radius, y2], color, stroke, zIndex, id1, id2);
        } else if (x1 > x2) {
            return this.createLine([x1 - this.radius, y1, x1 - this.firstline - this.radius, y1, x1 - this.firstline - this.radius, y1 + distanceY, x2 + this.radius, y2], color, stroke, zIndex, id1, id2);
        } else {
            return this.createLine([x1 + this.radius, y1, x1 + this.firstline + this.radius, y1, x1 + this.firstline + this.radius, y1 + distanceY, x2 + this.radius, y2], color, stroke, zIndex, id1, id2);
        }
    }
    render() {
        return (
            <div id="container" className="scroll-view">

            </div>
        )
    }
}

export default Roadmap;