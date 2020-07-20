(function() {
    angular.module("angularjs-datetime-picker", []);
    var e = function(e, k, g) {
        var h = g("DatetimePickerCtrl");
        return {
            open: function(d) {
                h.openDatetimePicker(d)
            },
            close: function() {
                h.closeDatetimePicker()
            }
        }
    };
    e.$inject = ["$compile", "$document", "$controller"];
    angular.module("angularjs-datetime-picker").factory("DatetimePicker", e);
    e = function(e, k) {
        var g, h = this,
            d = function(c) {
                c && c.remove();
                k[0].body.removeEventListener("click", h.closeDatetimePicker)
            };
        this.openDatetimePicker = function(c) {
            this.closeDatetimePicker();
            var b = angular.element("<div datetime-picker-popup ng-cloak></div>");
            c.dateFormat && b.attr("date-format", c.dateFormat);
            c.ngModel && b.attr("ng-model", c.ngModel);
            c.year && b.attr("year", parseInt(c.year));
            c.month && b.attr("month", parseInt(c.month));
            c.day && b.attr("day", parseInt(c.day));
            c.hour && b.attr("hour", parseInt(c.hour));
            c.minute && b.attr("minute", parseInt(c.minute));
            "" !== c.dateOnly && !0 !== c.dateOnly || b.attr("date-only", "true");
            "false" === c.closeOnSelect && b.attr("close-on-select", "false");
            var d = c.triggerEl;
            c.scope = c.scope || angular.element(d).scope();
            g = e(b)(c.scope)[0];
            g.triggerEl = c.triggerEl;
            k[0].body.appendChild(g);
            b = d.getBoundingClientRect();
            c.scope.$apply();
            c = g.getBoundingClientRect();
            g.style.position = "absolute";
            g.style.left = b.width > c.width ? b.left + b.width - c.width + window.scrollX + "px" : b.left + window.scrollX + "px";
            g.style.top = 200 > b.top || 200 < window.innerHeight - b.bottom ? b.bottom + window.scrollY + "px" : b.top - c.height + window.scrollY + "px";
            k[0].body.addEventListener("click", this.closeDatetimePicker)
        };
        this.closeDatetimePicker =
            function(c) {
                var b = c && c.target,
                    g = k[0].querySelector("div[datetime-picker-popup]");
                c && b ? b.hasAttribute("datetime-picker") || g && g.contains(b) || d(g) : d(g)
            }
    };
    e.$inject = ["$compile", "$document"];
    angular.module("angularjs-datetime-picker").controller("DatetimePickerCtrl", e);
    e = function(e, k) {
        var g, h, d, c, b = function() {
                g = [];
                h = [];
                d = [];
                c = 0;
                for (var a = 1; 31 >= a; a++) g.push(a);
                for (a = 0; 12 > a; a++) h.push({
                    fullName: e.DATETIME_FORMATS.MONTH[a],
                    shortName: e.DATETIME_FORMATS.SHORTMONTH[a]
                });
                for (a = 0; 7 > a; a++) {
                    var b = e.DATETIME_FORMATS.DAY[(a +
                        c) % 7];
                    d.push({
                        fullName: b,
                        firstLetter: b.substr(0, 1)
                    })
                }
                c = 0
            },
            m = function(a, b) {
                11 < b ? a++ : 0 > b && a--;
                b = (b + 12) % 12;
                var d = new Date(a, b, 1),
                    e = new Date(a, b, 0),
                    k = (new Date(a, b + 1, 0)).getDate(),
                    e = e.getDate(),
                    d = (d.getDay() - c + 7) % 7 || 7,
                    f = g.slice(0, 42 - (d + k));
                7 < f.length && (f = f.slice(0, f.length - 7));
                return {
                    year: a,
                    month: b,
                    days: g.slice(0, k),
                    leadingDays: g.slice(-d - (31 - e), e),
                    trailingDays: f
                }
            };
        return {
            restrict: "A",
            template: '<div class="angularjs-datetime-picker">\n<span style="margin-left:215px; color:#DC143C;"><a style="color:#DC143C;" href="javascript:void(0);" ng-click="closeDatePicker()">X</a></span>\n  <div class="adp-month">\n    <button type="button" class="adp-prev" ng-click="addMonth(-1)">&laquo;</button>\n    <span title="{{months[mv.month].fullName}}">{{months[mv.month].shortName}}</span> {{mv.year}}\n    <button type="button" class="adp-next" ng-click="addMonth(1)">&raquo;</button>\n  </div>\n  <div class="adp-days" ng-click="setDate($event)">\n    <div class="adp-day-of-week" ng-repeat="dayOfWeek in ::daysOfWeek" title="{{dayOfWeek.fullName}}">{{::dayOfWeek.firstLetter}}</div>\n    <div class="adp-day" ng-show="mv.leadingDays.length < 7" ng-repeat="day in mv.leadingDays">{{::day}}</div>\n    <div class="adp-day selectable" ng-repeat="day in mv.days" \n      today="{{today}}" d2="{{mv.year + \'-\' + (mv.month + 1) + \'-\' + day}}"\n      ng-class="{\n        selected: (day == selectedDay),\n        today: (today == (mv.year + \'-\' + (mv.month + 1) + \'-\' + day)),\n        weekend: (mv.leadingDays.length + day)%7 == 1 || (mv.leadingDays.length + day)%7 == 0\n      }">\n      {{::day}}\n    </div>\n    <div class="adp-day" ng-show="mv.trailingDays.length < 7" ng-repeat="day in mv.trailingDays">{{::day}}</div>\n  </div>\n  <div class="adp-days" id="adp-time"> \n\t <hr>\n\t <span style="color:#000000;">Choose the booking time.</span>\n    <input title="Hour" class="hourInput" type="range" min="0" max="23" ng-model="inputHour" ng-change="updateNgModel()" />\n    <input title="Minute" class="minutesInput" type="range" min="0" max="59" ng-model="inputMinute"  ng-change="updateNgModel()"/> \n    <input title="Second" class="minutesInput" type="range" min="0" max="59" ng-model="inputSecond"  ng-change="updateNgModel()"/> \n\t <span style="color:green; margin-left: 180px;"><a style="color:#006400;" href="javascript:void(0);" ng-click="closeDatePicker()">Done</a></span>\n  </div> \n</div>',
            controller: "DatetimePickerCtrl",
            replace: !0,
            scope: {
                year: "=",
                month: "=",
                day: "=",
                hour: "=",
                minute: "=",
                dateOnly: "=",
                closeOnSelect: "="
            },
            link: function(a, c, e, g) {
                b();
                var n = e.dateFormat || "short";
                a.months = h;
                a.daysOfWeek = d;
                a.inputHour;
                a.inputMinute;
                a.inputSecond;
                !0 === a.dateOnly && (c[0].querySelector("#adp-time").style.display = "none");
                a.$applyAsync(function() {
                    g.triggerEl = angular.element(c[0].triggerEl);
                    if (e.ngModel) {
                        var f = "" + g.triggerEl.scope().$eval(e.ngModel);
                        if (f) {
                            f.match(/[0-9]{2}:/) || (f += " 00:00:00");
                            var f =
                                f.replace(/([0-9]{2}-[0-9]{2})-([0-9]{4})/, "$2-$1"),
                                f = f.replace(/([\/-][0-9]{2,4})\ ([0-9]{2}\:[0-9]{2}\:)/, "$1T$2"),
                                f = f.replace(/EDT|EST|CDT|CST|MDT|PDT|PST|UT|GMT/g, ""),
                                f = f.replace(/\s*\(\)\s*/, ""),
                                b = f = f.replace(/[\-\+][0-9]{2}:?[0-9]{2}$/, "");
                            "string" == typeof f && (f = new Date(f));
                            var d = new Date(f.getFullYear(), 0, 1),
                                h = new Date(f.getFullYear(), 6, 1),
                                d = Math.max(d.getTimezoneOffset(), h.getTimezoneOffset()),
                                f = f.getTimezoneOffset() < d ? d - 60 : d,
                                f = (0 <= f ? "-" : "+") + ("0" + f / 60).slice(-2) + ":" + ("0" + f % 60).slice(-2),
                                b = new Date(b + f);
                            a.selectedDate = new Date(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds())
                        }
                    }
                    if (!a.selectedDate || isNaN(a.selectedDate.getTime())) {
                        var l = new Date,
                            b = a.year || l.getFullYear(),
                            f = a.month ? a.month - 1 : l.getMonth(),
                            d = a.day || l.getDate(),
                            h = a.hour || l.getHours(),
                            l = a.minute || l.getMinutes();
                        a.selectedDate = new Date(b, f, d, h, l, 0)
                    }
                    a.inputHour = a.selectedDate.getHours();
                    a.inputMinute = a.selectedDate.getMinutes();
                    a.inputSecond = a.selectedDate.getSeconds();
                    a.mv = m(a.selectedDate.getFullYear(),
                        a.selectedDate.getMonth());
                    a.today = k(new Date, "yyyy-M-d");
                    a.mv.year == a.selectedDate.getFullYear() && a.mv.month == a.selectedDate.getMonth() ? a.selectedDay = a.selectedDate.getDate() : a.selectedDay = null
                });
                a.addMonth = function(b) {
                    a.mv = m(a.mv.year, a.mv.month + b)
                };
                a.setDate = function(b) {
                    b = angular.element(b.target)[0]; - 1 !== b.className.indexOf("selectable") && (a.updateNgModel(parseInt(b.innerHTML)), !1 !== a.closeOnSelect && g.closeDatetimePicker())
                };
                a.updateNgModel = function(b) {
                    b = b ? b : a.selectedDate.getDate();
                    a.selectedDate =
                        new Date(a.mv.year, a.mv.month, b, a.inputHour, a.inputMinute, a.inputSecond, 0);
                    a.selectedDay = a.selectedDate.getDate();
                    if (e.ngModel) {
                        b = g.triggerEl.scope();
                        var c;
                        c = b.$eval(e.ngModel) && "Date" === b.$eval(e.ngModel).constructor.name ? new Date(k(a.selectedDate, n)) : k(a.selectedDate, n);
                        b.$eval(e.ngModel + "= date", {
                            date: c
                        })
                    }
                };
                a.closeDatePicker = function() {
                    $(".angularjs-datetime-picker").hide()
                };
                a.$on("$destroy", g.closeDatetimePicker)
            }
        }
    };
    e.$inject = ["$locale", "dateFilter"];
    angular.module("angularjs-datetime-picker").directive("datetimePickerPopup",
        e);
    e = function(e, k) {
        return {
            require: "ngModel",
            link: function(e, h, d, c) {
                e.$watch(d.ngModel, function(b) {
                    if (b && "" != b) {
                        b = new Date(b);
                        c.$setValidity("date", b ? !0 : !1);
                        var e = new Date;
                        d.hasOwnProperty("futureOnly") && c.$setValidity("future-only", b < e ? !1 : !0)
                    }
                });
                h[0].addEventListener("click", function() {
                    k.open({
                        triggerEl: h[0],
                        dateFormat: d.dateFormat,
                        ngModel: d.ngModel,
                        year: d.year,
                        month: d.month,
                        day: d.day,
                        hour: d.hour,
                        minute: d.minute,
                        dateOnly: d.dateOnly,
                        futureOnly: d.futureOnly,
                        closeOnSelect: d.closeOnSelect
                    })
                })
            }
        }
    };
    e.$inject = ["$parse", "DatetimePicker"];
    angular.module("angularjs-datetime-picker").directive("datetimePicker", e)
})();