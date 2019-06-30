import React from 'react';
import Konva from 'konva';
import $ from 'jquery';
import { thisTypeAnnotation } from '@babel/types';

class Roadmap extends React.Component {
    constructor(props) {
        super(props);
        this.padding = 50;
        this.radius = 20;
        this.firstline = 60;
        this.distanceBetweenLayer = 200;
        this.distanceBetweenNode = 100;
        this.startX = 100;
        this.startY = 20;
        this.isRender = [];
        this.level = [];
        this.layer = {}
        this.stage = {};
        this.linesHover = [];
        this.circles = [];
        this.subjects = [
            {
                "id": 1,
                "ten": "NONONO",
                "soTinChi": 1,
                "tenGV": "HIHII",
                "soLuongSVToiDa": 100,
                "soLuongSVDaDangKyDot1": 150,
                "soLuongSVDaDangKyDot2": 100,
                "ngayBatDau": "20-12-2012",
                "ngayKetThuc": "21-12-2012",
                "tienquyet": [
                    {
                        "id": 2,
                        "ten": "NONONO",
                        "soTinChi": 1,
                        "tenGV": "HIHII",
                        "soLuongSVToiDa": 200,
                        "soLuongSVDaDangKyDot1": 150,
                        "soLuongSVDaDangKyDot2": 170,
                        "ngayBatDau": "20-12-2012",
                        "ngayKetThuc": "21-12-2012",
                        "tienquyet": [{
                            "id": 20,
                            "ten": "NONONO",
                            "soTinChi": 1,
                            "tenGV": "HIHII",
                            "soLuongSVToiDa": 200,
                            "soLuongSVDaDangKyDot1": 150,
                            "soLuongSVDaDangKyDot2": 170,
                            "ngayBatDau": "20-12-2012",
                            "ngayKetThuc": "21-12-2012",
                            "tienquyet": []
                        },
                        {
                            "id": 22,
                            "ten": "NONONO",
                            "soTinChi": 1,
                            "tenGV": "HIHII",
                            "soLuongSVToiDa": 200,
                            "soLuongSVDaDangKyDot1": 150,
                            "soLuongSVDaDangKyDot2": 170,
                            "ngayBatDau": "20-12-2012",
                            "ngayKetThuc": "21-12-2012",
                            "tienquyet": [
                                {
                                    "id": 3,
                                    "ten": "NONONO",
                                    "soTinChi": 1,
                                    "tenGV": "HIHII",
                                    "soLuongSVToiDa": 200,
                                    "soLuongSVDaDangKyDot1": 150,
                                    "soLuongSVDaDangKyDot2": 170,
                                    "ngayBatDau": "20-12-2012",
                                    "ngayKetThuc": "21-12-2012",
                                    "tienquyet": [
                                        {
                                            "id": 99,
                                            "ten": "NONONO",
                                            "soTinChi": 1,
                                            "tenGV": "HIHII",
                                            "soLuongSVToiDa": 200,
                                            "soLuongSVDaDangKyDot1": 150,
                                            "soLuongSVDaDangKyDot2": 170,
                                            "ngayBatDau": "20-12-2012",
                                            "ngayKetThuc": "21-12-2012",
                                            "tienquyet": []
                                        },
                                        {
                                            "id": 100,
                                            "ten": "NONONO",
                                            "soTinChi": 1,
                                            "tenGV": "HIHII",
                                            "soLuongSVToiDa": 200,
                                            "soLuongSVDaDangKyDot1": 150,
                                            "soLuongSVDaDangKyDot2": 170,
                                            "ngayBatDau": "20-12-2012",
                                            "ngayKetThuc": "21-12-2012",
                                            "tienquyet": []
                                        }
                                    ]
                                }
                            ]
                        },
                        ]
                    },
                    {
                        "id": 4,
                        "ten": "NONONO",
                        "soTinChi": 1,
                        "tenGV": "HIHII",
                        "soLuongSVToiDa": 200,
                        "soLuongSVDaDangKyDot1": 150,
                        "soLuongSVDaDangKyDot2": 170,
                        "ngayBatDau": "20-12-2012",
                        "ngayKetThuc": "21-12-2012",
                        "tienquyet": [{
                            "id": 23,
                            "ten": "NONONO",
                            "soTinChi": 1,
                            "tenGV": "HIHII",
                            "soLuongSVToiDa": 200,
                            "soLuongSVDaDangKyDot1": 150,
                            "soLuongSVDaDangKyDot2": 170,
                            "ngayBatDau": "20-12-2012",
                            "ngayKetThuc": "21-12-2012",
                            "tienquyet": [{
                                "id": 90,
                                "ten": "NONONO",
                                "soTinChi": 1,
                                "tenGV": "HIHII",
                                "soLuongSVToiDa": 200,
                                "soLuongSVDaDangKyDot1": 150,
                                "soLuongSVDaDangKyDot2": 170,
                                "ngayBatDau": "20-12-2012",
                                "ngayKetThuc": "21-12-2012",
                                "tienquyet": [
                                    {
                                        "id": 6,
                                        "ten": "NONONO",
                                        "soTinChi": 1,
                                        "tenGV": "HIHII",
                                        "soLuongSVToiDa": 200,
                                        "soLuongSVDaDangKyDot1": 150,
                                        "soLuongSVDaDangKyDot2": 170,
                                        "ngayBatDau": "20-12-2012",
                                        "ngayKetThuc": "21-12-2012",
                                        "tienquyet": []
                                    }]
                            }]
                        },
                        {
                            "id": 22,
                            "ten": "NONONO",
                            "soTinChi": 1,
                            "tenGV": "HIHII",
                            "soLuongSVToiDa": 200,
                            "soLuongSVDaDangKyDot1": 150,
                            "soLuongSVDaDangKyDot2": 170,
                            "ngayBatDau": "20-12-2012",
                            "ngayKetThuc": "21-12-2012",
                            "tienquyet": []
                        }]
                    },
                ]
            },
            {
                "id": 5,
                "ten": "NONONO",
                "soTinChi": 1,
                "tenGV": "HIHII",
                "soLuongSVToiDa": 200,
                "soLuongSVDaDangKyDot1": 150,
                "soLuongSVDaDangKyDot2": 170,
                "ngayBatDau": "20-12-2012",
                "ngayKetThuc": "21-12-2012",
                "tienquyet": [
                    {
                        "id": 88,
                        "ten": "NONONO",
                        "soTinChi": 1,
                        "tenGV": "HIHII",
                        "soLuongSVToiDa": 200,
                        "soLuongSVDaDangKyDot1": 150,
                        "soLuongSVDaDangKyDot2": 170,
                        "ngayBatDau": "20-12-2012",
                        "ngayKetThuc": "21-12-2012",
                        "tienquyet": []
                    },

                    {
                        "id": 33,
                        "ten": "NONONO",
                        "soTinChi": 1,
                        "tenGV": "HIHII",
                        "soLuongSVToiDa": 200,
                        "soLuongSVDaDangKyDot1": 150,
                        "soLuongSVDaDangKyDot2": 170,
                        "ngayBatDau": "20-12-2012",
                        "ngayKetThuc": "21-12-2012",
                        "tienquyet": []
                    }
                ]
            },
            {
                "id": 11,
                "ten": "NONONO",
                "soTinChi": 1,
                "tenGV": "HIHII",
                "soLuongSVToiDa": 200,
                "soLuongSVDaDangKyDot1": 150,
                "soLuongSVDaDangKyDot2": 170,
                "ngayBatDau": "20-12-2012",
                "ngayKetThuc": "21-12-2012",
                "tienquyet": [
                    {
                        "id": 12,
                        "ten": "NONONO",
                        "soTinChi": 1,
                        "tenGV": "HIHII",
                        "soLuongSVToiDa": 200,
                        "soLuongSVDaDangKyDot1": 150,
                        "soLuongSVDaDangKyDot2": 170,
                        "ngayBatDau": "20-12-2012",
                        "ngayKetThuc": "21-12-2012",
                        "tienquyet": [
                            {
                                "id": 991,
                                "ten": "NONONO",
                                "soTinChi": 1,
                                "tenGV": "HIHII",
                                "soLuongSVToiDa": 200,
                                "soLuongSVDaDangKyDot1": 150,
                                "soLuongSVDaDangKyDot2": 170,
                                "ngayBatDau": "20-12-2012",
                                "ngayKetThuc": "21-12-2012",
                                "tienquyet": [
                                    {
                                        "id": 992,
                                        "ten": "NONONO",
                                        "soTinChi": 1,
                                        "tenGV": "HIHII",
                                        "soLuongSVToiDa": 200,
                                        "soLuongSVDaDangKyDot1": 150,
                                        "soLuongSVDaDangKyDot2": 170,
                                        "ngayBatDau": "20-12-2012",
                                        "ngayKetThuc": "21-12-2012",
                                        "tienquyet": [
                                            {
                                                "id": 1992,
                                                "ten": "NONONO",
                                                "soTinChi": 1,
                                                "tenGV": "HIHII",
                                                "soLuongSVToiDa": 200,
                                                "soLuongSVDaDangKyDot1": 150,
                                                "soLuongSVDaDangKyDot2": 170,
                                                "ngayBatDau": "20-12-2012",
                                                "ngayKetThuc": "21-12-2012",
                                                "tienquyet": []
                                            },
                                            {
                                                "id": 1011,
                                                "ten": "NONONO",
                                                "soTinChi": 1,
                                                "tenGV": "HIHII",
                                                "soLuongSVToiDa": 200,
                                                "soLuongSVDaDangKyDot1": 150,
                                                "soLuongSVDaDangKyDot2": 170,
                                                "ngayBatDau": "20-12-2012",
                                                "ngayKetThuc": "21-12-2012",
                                                "tienquyet": [{
                                                    "id": 9922,
                                                    "ten": "NONONO",
                                                    "soTinChi": 1,
                                                    "tenGV": "HIHII",
                                                    "soLuongSVToiDa": 200,
                                                    "soLuongSVDaDangKyDot1": 150,
                                                    "soLuongSVDaDangKyDot2": 170,
                                                    "ngayBatDau": "20-12-2012",
                                                    "ngayKetThuc": "21-12-2012",
                                                    "tienquyet": []
                                                },]
                                            }
                                        ]
                                    },
                                    {
                                        "id": 101,
                                        "ten": "NONONO",
                                        "soTinChi": 1,
                                        "tenGV": "HIHII",
                                        "soLuongSVToiDa": 200,
                                        "soLuongSVDaDangKyDot1": 150,
                                        "soLuongSVDaDangKyDot2": 170,
                                        "ngayBatDau": "20-12-2012",
                                        "ngayKetThuc": "21-12-2012",
                                        "tienquyet": []
                                    }
                                ]
                            },
                            {
                                "id": 200,
                                "ten": "NONONO",
                                "soTinChi": 1,
                                "tenGV": "HIHII",
                                "soLuongSVToiDa": 200,
                                "soLuongSVDaDangKyDot1": 150,
                                "soLuongSVDaDangKyDot2": 170,
                                "ngayBatDau": "20-12-2012",
                                "ngayKetThuc": "21-12-2012",
                                "tienquyet": []
                            }
                        ]
                    }
                ]
            }
        ]
        this.state = {

        };
    }
    componentDidMount() {
        this.stage = this.initStage();
        this.layer = this.initLayer();
        this.generateTienquyet(this.subjects, this.startX, this.startY, null, 0);
        this.draw(this.subjects);

        this.addLayerToStage();
    }
    drawBackLines(subject) {
        for (let i = 0; i < subject.cothehoc.length; i++) {
            if (subject.cothehoc[i] != null) {
                var line = this.createLineFromCircleToCircle(subject.cothehoc[i].x, subject.cothehoc[i].y, subject.x, subject.y, 'yellow', 5);
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
                var line = this.createLineFromCircleToCircle(subject.x, subject.y, subject.tienquyet[i].x, subject.tienquyet[i].y, 'blue', 5);
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
                var tooltip = this.createToolTip(subject.cothehoc[i].ten, subject.cothehoc[i].x, subject.cothehoc[i].y - this.radius / 2);
                this.linesHover = [...this.linesHover, tooltip];
                this.addNodeToLayer(tooltip);
                this.drawBackTooltips(subject.cothehoc[i]);
            }
        }
        this.addLayerToStage();
    }
    drawNextTooltips(subject) {
        for (let i = 0; i < subject.tienquyet.length; i++) {
            if (subject.tienquyet[i] != null) {
                var tooltip = this.createToolTip(subject.tienquyet[i].ten, subject.tienquyet[i].x, subject.tienquyet[i].y - this.radius / 2);
                this.linesHover = [...this.linesHover, tooltip];
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
        this.linesHover = [...this.linesHover, tooltip];
        this.addNodeToLayer(tooltip);
        this.addLayerToStage();

        this.drawBackTooltips(subject);
        this.drawNextTooltips(subject);
    }
    mouseOut(id) {
        this.stage.container().style.cursor = 'default';
        this.linesHover.forEach(line => {
            line.destroy();
        })
    }
    drawCircles(subjects) {
        for (let i = 0; i < subjects.length; i++) {
            var circle = this.createCircle(subjects[i].x, subjects[i].y, subjects[i].id);
            this.circles = [...this.circles, circle];
            this.addNodeToLayer(circle);
            this.drawCircles(subjects[i].tienquyet);
        }

    }
    drawLines(subjects) {
        for (let i = 0; i < subjects.length; i++) {
            for (let j = 0; j < subjects[i].tienquyet.length; j++) {
                var line = this.createLineFromCircleToCircle(subjects[i].x, subjects[i].y, subjects[i].tienquyet[j].x, subjects[i].tienquyet[j].y);
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
        var width = $("#container").width() + 10000;
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
    createCircle(x, y, id) {
        var circle = new Konva.Circle({
            x: this.padding + x,
            y: this.padding + y,
            radius: this.radius,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 1,
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
    createLine(points, color, stroke, zIndex) {
        let new_points = points.map(point => point + this.padding);
        return new Konva.Line({
            points: new_points,
            stroke: color,
            strokeWidth: stroke,
            lineCap: 'round',
            lineJoin: 'round',
            // zIndex: zIndex
        });
    }
    createToolTip(text, x, y) {
        var tooltip = new Konva.Label({
            x: this.padding + x,
            y: this.padding + y,
            opacity: 0.75
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
    createLineFromCircleToCircle(x1, y1, x2, y2, color, stroke, zIndex) {
        var distanceY = y2 - y1;
        if (color === undefined) color = "black";
        if (stroke === undefined) stroke = 1;
        if (zIndex === undefined) zIndex = 1;
        return this.createLine([x1 + this.radius, y1, x1 + this.firstline + this.radius, y1, x1 + this.firstline + this.radius, y1 + distanceY, x2 - this.radius, y2], color, stroke, zIndex);
    }
    render() {
        return (
            <div id="container" className="scroll-view">

            </div>
        )
    }
}

export default Roadmap;