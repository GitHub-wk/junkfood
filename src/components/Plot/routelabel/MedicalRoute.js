﻿/**
*   医疗
*   @class Hmap.Plot.Routelabel.MedicalRoute
*/

define(['BaseRoute', 'Hobject', 'GeoLineString', 'Hmath', 'GeoPolygon'], function (BaseRoute, Hobject, GeoLineString, Hmath, GeoPolygon) {

    var extend = Hobject.BaseFunc.extend,
      copy = Hobject.BaseFunc.copy,
       //对象导入
      mHmath = new Hmath.h2dmath(),
      scalePoint = mHmath.scalePoint,
      distance = mHmath.distance,
      pathLength = mHmath.pathLength,
      bzLine = mHmath.bzLine,
      gainPt = mHmath.gainPt,
      vertex = mHmath.vertex,
      angle = mHmath.angle;

    var _medicalRoute = function () {
        BaseRoute.call(this);
    }

    extend(_medicalRoute, BaseRoute);

    _medicalRoute.prototype.signal = function (H, rectLDown, rectRDown, rectLUp, rectRUp) {
        var line2 = scalePoint(rectLDown, rectRDown, 0.2),
        line8 = scalePoint(rectLDown, rectRDown, 0.8),
        l1 = vertex(rectLDown, rectLDown, this.points[0], H, false),  
        l2 = vertex(this.points[0], l1, l1, 0.8 * H, false),
        l3 = vertex(this.points[0], l1, l1, H, true),
        l4 = vertex(l2, l1, l1, 0.8 * H, false),
        l5 = vertex(l2, l1, l1, 0.8 * H, true);
        var path3 = [l3, l1,l3,l2,l3,l4,l3,l5];   //三角形坐标集
        this.triangle.coordinates = [path3];
        this._plotElement.shapes[2] = this._plotElement.shapes[2] || this.triangle;
    }

    return _medicalRoute;

});