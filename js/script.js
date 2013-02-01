/* Author: UNDEFINED -> DEXMA

*/
$(document).ready(function () {

    $(".n1, .tag-list").select2({
        placeholder: ""
    });
    $(".generic-dropdown").select2({
        minimumResultsForSearch: 99999
    });
    $('.combobox').combobox();
    $(".generic-multiple").select2();


    $(".combo-search").combobox();

    if ($('.rangepicker-generic').length) {
        $('.rangepicker-generic').daterangepicker();
    }

    var breadPosition = 1;

    function createLevel(arguments) {
        var value = $(".n1").select2("val");
        var selected = $("option:selected", this);
        var d = $("<li class='bread-element' data-index='" + breadPosition + "'></li>");
        var e = $("<select class='level' id='level-" + breadPosition + "' style='min-width:95px' >" + selected.parent().html() + "</select>");
        d.insertAfter($('.bread-element').last()).append(e);
        e.select2({
            minimumResultsForSearch: 99999
        });
        $('#level-' + breadPosition).select2("val", value);
        e.siblings('.select2-container').append("<a href='#' class='remove-level'>x</a>");
        $('.start-info').css('display', 'none');
        breadPosition++;
        //showMessage();
        $('.remove-level').bind("click", removeLevel);
    }

    function removeLevel() {
        var levelPosition = $(this).parent().parent().attr('data-index');
        $('.bread-element').each(function (index) {
            if ($(this).attr('data-index') >= levelPosition) {
                $(this).remove();
            }
        });
        showMessage();
        return false;
    }

    function showMessage() {
        $('.bread-element').each(function (index) {
            numberElements = index;
        });

        if (numberElements == 0) {
            $('.start-info').css('display', 'inline-block');
        }
    }

    function createTag(arguments) {
        var f = $("<div class='tag'>" + $('.tag-list').select2('val') + "<a href='#' class='remove-tag'>x</a><div>");
        $('.tag-container').prepend(f);
        $('.tag-info').css('display', 'none');
        $('.remove-tag').bind("click", removeTag);
    }

    function removeTag() {
        $(this).parent().remove();
        showTagMessage();
        return false;
    }

    function showTagMessage() {
        var tagExists = $('.tag-container').children().hasClass('tag');
        if (!tagExists) {
            $('.tag-info').css('display', 'inline-block');
        };
    }

    $(".n1").bind("change", createLevel);
    $(".tag-list").bind("change", createTag);

    // Checkbox styles
    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            $(this).parent(".checkbox").addClass("checked");
        } else {
            $(this).parent(".checkbox").removeClass("checked");
        }
    })

    .mousedown(function () {
        $(this).parent(".checkbox").addClass("active");
    })

    .mouseup(function () {
        $(this).parent(".checkbox").removeClass("active");
    });

    // Radiobutton styles
    $('input[type="radio"]').ezMark();

    // Scrolling on widget conf
    $('a[data-toggle="tab"]').on('shown', function (e) {

      e.target // activated tab
      e.relatedTarget // previous tab
      var isMarket = $(this).attr('href');

      if (isMarket == "#market") {
        $('body').addClass('market');
      } else {
        $('body').removeClass('market');
      }
    });
    $('.services-list').jScrollPane();



    // Widgets create / delete
    function addWidget() {
        //$(this).next('.wd-element').hide();
        $(this).parents('.wd-element').html('<div class="widget-remove clearfix"><ul class="widget-add-list"><li><a href="#" class="clima">Clima</a></li><li><a href="#" class="ahorro">Ahorro</a></li><li><a href="#" class="maximetro">Maxímetro</a></li><li><a href="#" class="clima">Clima</a></li><li><a href="#" class="ahorro">Ahorro</a></li><li><a href="#" class="maximetro">Maxímetro</a></li><li><a href="#" class="clima">Clima</a></li><li><a href="#" class="ahorro">Ahorro</a></li><li><a href="#" class="maximetro">Maxímetro</a></li><li><a href="#" class="clima">Clima</a></li><li><a href="#" class="ahorro">Ahorro</a></li><li><a href="#" class="maximetro">Maxímetro</a></li><li><a href="#" class="clima">Clima</a></li><li><a href="#" class="ahorro">Ahorro</a></li><li><a href="#" class="maximetro">Maxímetro</a></li><li><a href="#" class="clima">Clima</a></li><li><a href="#" class="ahorro">Ahorro</a></li><li><a href="#" class="maximetro">Maxímetro</a></li><li><a href="#" class="clima">Clima</a></li><li><a href="#" class="ahorro">Ahorro</a></li><li><a href="#" class="maximetro">Maxímetro</a></li></ul><button class="btn widget-reset">Eliminar widget</button></div>');
    }

    function selectWidget() {
        var widgetType = $(this).attr('class');

        $(this).parents('.wd-element').html('<div class="widget-done"><h4>' + widgetType + '</h4><a href="#" class="widget-edit">Edit</a><img src="img/widget/' + widgetType + '.jpg" /></div>');

        if (jQuery('.dashboard-widgets ul .widget-add').length == 0) {
            $('.dashboard-widgets ul').append('<li class="wd-element"><div class="widget-add"><a href="#" class="wd-add">Añadir widget</a></div></li>');
        }
    }

    function resetWidget() {
        var voidWidget = $(this).parents('.wd-element');
        $(this).parents('.wd-element').html('<div class="widget-add"><a href="#" class="wd-add">Añadir widget</a></div>');
        if (jQuery('.dashboard-widgets ul .widget-add').length != 1) {
            voidWidget.remove();
        }
    }

    // $('.wd-add, .widget-edit').live('click',addWidget);
    // $('.widget-add-list li a').live('click',selectWidget);
    // $('.widget-reset').live('click',resetWidget);
    $('.dash-addmenu').keyup(function (e) {
        var menuPosition = $('.dash-menu li').length;
        if (e.keyCode == 13) {
            if (this.value != "Nuevo Dashboard" || this.value != "") {
                $('.dash-menu li:nth-last-child(2)').before('<li><a href="#dash-level-' + menuPosition + '" data-toggle="tab">' + this.value + '</a></li>');
                $('.dash-content').append('<div id="dash-level-' + menuPosition + '" class="tab-pane"><h2>Nuevo apartado ' + this.value + '</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>');
                this.value = "";
            }
        }
    });

    // Locations collapse
    $('.locations-switch').on('click', function () {
        if ($(this).text() == "Desplegar todas las fichas") {
            $('.ficha .collapse').collapse('show');
            $(this).text("Cerrar todas");
            $('.collapse-switch').addClass('opened');
        } else {
            $('.ficha .collapse').collapse('hide');
            $(this).text("Desplegar todas las fichas");
            $('.collapse-switch').removeClass('opened');
        }
    });

    $('.collapse-switch').on('click', function () {
        $(this).toggleClass('opened');
        if ($('.ficha .opened').length == 0) {
            $('.locations-switch').text("Desplegar todas las fichas");
        } else if ($('.ficha .opened').length == $('.ficha .collapse-switch').length) {
            $('.locations-switch').text("Cerrar todas");
        }
    });

    // Concentradores collapse
    $('.concentradores-switch').on('click', function () {
        if ($(this).text() == "Desplegar todas las fichas") {
            $('.concentrador .collapse').collapse('show');
            $(this).text("Cerrar todas");
            $('.collapse-switch').addClass('opened');
        } else {
            $('.concentrador .collapse').collapse('hide');
            $(this).text("Desplegar todas las fichas");
            $('.collapse-switch').removeClass('opened');
        }

    });

    // Table sorter

    // Time picker
    $('.timepicker-default').timepicker();

    // Add comment
    function switchForm() {

        $('.comments-form').toggleClass('new-comment');
        $('.ana-comments').css('height', 'auto');
        return false;
    }

    $('.add-comment, .close-comment, .comment-cancel, .comment-publish').live('click', switchForm);

    function createComment() {
        $('.comments-list li:last-child').before('<li><img src="" width="110" height="30" style="background:#e5f5ff" /><section><header><p class="comment-mail">dexcell@undefined.es</p><a href="" class="comment-remove">Close</a><p class="comment-date">16/07/2012 18:59:55</p></header><p class="comment-message">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class="arrow-left2"><div class="arrow-left"></div></div></section></li>');

        commentCount();
        return false;
    }

    $('.comment-publish').live('click', createComment);

    function removeComment() {
        var commentTarget = $(this).parents('li');
        commentTarget.remove();
        commentCount();
        return false;
    }

    $('.comment-remove').live('click', removeComment);

    function commentCount() {
        var commentCount = $('.comments-list li').length - 1;
        $('.comment-count').html(commentCount);
    }

    commentCount();

    // Add parameter
    function createParameter() {
        $('<div class="control-group"><div class="controls separador-2 clearfix"><select class="generic-dropdown" style="width:156px"><option>Coste diario TE</option><option>Daily diesel energy</option><option>Option02</option><option>Option03</option></select><select class="generic-dropdown" style="width:96px"><option>Suma</option><option>Promedio</option><option>Option03</option><option>Option04</option></select><a class="parameter-remove" href="#">Eliminar</a></div>').insertBefore('.parameters-list .control-group:last-child');
        $('.parameters-list select').select2({
            minimumResultsForSearch: 99999
        });
        return false;
    }

    $('.add-parameters-btn').live('click', createParameter);

    function removeParameter() {
        var parameterTarget = $(this).parents('.control-group');
        parameterTarget.remove();
        return false;
    }

    $('.parameter-remove').live('click', removeParameter);

    // DATEPICKERS

    // Single Datepicker
    $('.single-datepicker').datepick({
        showOnFocus: true,
        showTrigger: '<span class="btn icon"><i class="icon-th"></i></span>',
        changeMonth: false,
        showAnim: ''
    });

    // Jquery-ui custom datepicker
    $("#datepicker").datepicker({
        monthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','OCT','Nov','Dec'],
        changeMonth: true,
        changeYear: true,
        showAnim: false,
        buttonImage: "img/datepicker_button.png",
        showOn: "both",
        showButtonPanel: true,
        buttonImageOnly: true
    });

    $('button.ui-datepicker-current').live('click', function() {
        $.datepicker._curInst.input.datepicker('setDate', new Date()).datepicker('hide');
    });

    // Customized Range Datepicker
    var to = new Date();
    var from = new Date(to.getTime() - 1000 * 60 * 60 * 24 * 14);
    
    // initialize the special date dropdown field
    $('#date-range-field span').text(from.toString('dd/MM/yyyy') + ' - ' + to.toString('dd/MM/yyyy'));

    $('#datepicker-calendar').DatePicker({
        inline: true,
        date: [from, to],
        calendars: 3,
        mode: 'range',
        starts: 1,
        showRanges: true,
        textField : '#date-range-field',
        onApply: function () {
            ToggleInput();
        }
    });

    // bind a click handler to the date display field, which when clicked
    // toggles the date picker calendar, flips the up/down indicator arrow,
    // and keeps the borders looking pretty

    $('#date-range-field').bind('click', ToggleInput);

    function ToggleInput() {
        $('#datepicker-calendar').toggle();
        $('#date-range-field').toggleClass('opened');
        
        // if ($('#date-range-field a').text().charCodeAt(0) == 9660) {
        //     // switch to up-arrow
        //     $('#date-range-field a').html('&#9650;');
        //     $('#date-range-field').css({});
        //     $('#date-range-field a').css({});
        // } else {
        //     // switch to down-arrow
        //     $('#date-range-field a').html('&#9660;');
        //     $('#date-range-field').css({});
        //     $('#date-range-field a').css({});
        // }

        return false;
    }


    // Select checkboxes from tables
    function selectAllTable(checkInput, checkAttr) {
        $(checkInput).on('click', function () {
            if ($(this).parent().hasClass('checked')) {
                $(checkAttr).attr('checked', true);
                $(checkAttr).parent().addClass('checked');
            } else {
                $(checkAttr).attr('checked', false);
                $(checkAttr).parent().removeClass('checked');
            }
        })
    }

    selectAllTable('#seleccionar-informes .checkbox input', '#informes-table input');
    selectAllTable('#seleccionar-alertas .checkbox input', '#alertas-table input');
    selectAllTable('#seleccionar-avisos .checkbox input', '#avisos-table input');
    selectAllTable('#seleccionar-info .checkbox input', '#info-table input');
    selectAllTable('#seleccionar-grupos .checkbox input', '#grupos-table input');
    selectAllTable('#seleccionar-parametros .checkbox input', '#parametros-calculados-table input');
    selectAllTable('#seleccionar-widgets .checkbox input', '#widgets-table input');
    selectAllTable('#seleccionar-concentrador .checkbox input', '.concentrador input');
    selectAllTable('#seleccionar-suministros .checkbox input', '#suministros-table input');
    selectAllTable('#seleccionar-contrato .checkbox input', '#suministros-form-table input');
    selectAllTable('.nav-pills .checkbox input', '.ficha input');

    // Collapse content inside tables
    $('.content-toggle').on('click', function () {
        var level = $(this).siblings('td').find('.table-collapse-container');
        $(this).toggleClass('row-up');
        level.slideToggle();
    })

    // Collapse left-menu
    $('.submenu-arrow').on('click', function () {
        //$(this).parent().removeClass('active');
        //$(this).parent().addClass('inactive');
        $(this).siblings('.left-submenu').slideToggle('fast', function () {
            $(this).css('overflow', 'visible');
            $(this).siblings('code').fadeToggle();
            $('.left-menu li code').fadeToggle('slow');
        });
        $(this).toggleClass('menu-opened');
    });


    // Deselect options
    $('nav ul li a').on('click', function () {
        $('.left-submenu li').removeClass('active');
    });

    $('.left-submenu li a').on('click', function () {
        $(this).closest('.nav').find('li.active').removeClass('active');
    });

    // Eliminar informes
    $('.left-submenu li span').on('click', function () {
        var leftSubmenu = $(this).parents('.left-submenu');
        var menuArrow = leftSubmenu.siblings('span');
        if (leftSubmenu.children('li').length == 1) {
            menuArrow.remove();
        }
        $(this).parent('li').remove();
    });

    // Login
    $('#login-login').show();

    function showList() {
        $('.mkt').hide();
        $('#login-' + $(this).attr('data-info')).show();
    }

    $('#login-page #top-menu a').bind('click', showList);

    // Tooltips
    $(".info-tip-left").qtip({
        content: {
            attr: 'title'
        },
        position: {
            target: 'mouse',
            my: 'left center',
            at: 'right center',
            adjust: {
                x: 10,
                y: 0
            }
        },
        style: {
            tip: true,
            classes: 'ui-tooltip-dark ui-tooltip-rounded'
        }
    });
    $(".info-tip-right").qtip({
        content: {
            attr: 'title'
        },
        position: {
            target: 'mouse',
            my: 'right center',
            at: 'left center',
            adjust: {
                x: -10,
                y: 0
            }
        },
        style: {
            tip: true,
            classes: 'ui-tooltip-dark ui-tooltip-rounded'
        }
    });

    $('.gauge-tip').qtip({
        content: {
            attr: 'title'
        },
        position: {
            target: 'mouse',
            my: 'bottom center', 
            at: 'top center'
        },
        style: {
            tip: true,
            classes: 'ui-tooltip-dark ui-tooltip-rounded'
        }
    });

    if ($('.form_error').length){
        $(".form_error").qtip({
            content: {
                attr: 'title'
            },
            position: {
                target: 'mouse',
                my: 'left center',
                at: 'right center',
                adjust: {
                    x: 10,
                    y: 0
                }
            },
            style: {
                tip: true,
                classes: 'ui-tooltip-red ui-tooltip-rounded'
            }
        });
      
    }

    //Dialog
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function () {
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#opener").click(function () {
        $("#dialog").dialog("open");
        return false;
    });

    // Switch activated
    $('.onoffswitch').click(function () {
        var $checkbox = $(this).find(':checkbox');
        $checkbox.attr('checked', !$checkbox.is(':checked'));
    });

    // Spinner
    $('.generic-spinner').spinner({
        min: -1000,
        max: 1000,
        increment: 'fast'
    });

    // Multiselect with search

    $('#searchable').multiselect2side({
      search: "Search: "
    });
    
});


/* ============================================================
 * bootstrap-button.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!
function ($) {

    "use strict"; // jshint ;_;
    /* BUTTON PUBLIC CLASS DEFINITION
     * ============================== */

    var Button = function (element, options) {
            this.$element = $(element)
            this.options = $.extend({}, $.fn.button.defaults, options)
        }

    Button.prototype.setState = function (state) {
        var d = 'disabled',
            $el = this.$element,
            data = $el.data(),
            val = $el.is('input') ? 'val' : 'html'

        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())

        $el[val](data[state] || this.options[state])

        // push to event loop to allow forms to submit
        setTimeout(function () {
            state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d)
        }, 0)
    }

    Button.prototype.toggle = function () {
        var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

        $parent && $parent.find('.active').removeClass('active')

        this.$element.toggleClass('active')
    }


    /* BUTTON PLUGIN DEFINITION
     * ======================== */

    $.fn.button = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('button'),
                options = typeof option == 'object' && option
            if (!data) $this.data('button', (data = new Button(this, options)))
            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }

    $.fn.button.defaults = {
        loadingText: 'loading...'
    }

    $.fn.button.Constructor = Button


    /* BUTTON DATA-API
     * =============== */

    $(function () {
        $('body').on('click.button.data-api', '[data-toggle^=button]', function (e) {
            var $btn = $(e.target)
            if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
            $btn.button('toggle')
        })
    })

}(window.jQuery);

/* ========================================================
 * bootstrap-tab.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!
function ($) {

    "use strict"; // jshint ;_;
    /* TAB CLASS DEFINITION
     * ==================== */

    var Tab = function (element) {
            this.element = $(element)
        }

    Tab.prototype = {

        constructor: Tab

        ,
        show: function () {
            var $this = this.element,
                $ul = $this.closest('ul:not(.dropdown-menu)'),
                selector = $this.attr('data-target'),
                previous, $target, e

            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
            }

            if ($this.parent('li').hasClass('active')) return

            previous = $ul.find('.active a').last()[0]

            e = $.Event('show', {
                relatedTarget: previous
            })

            $this.trigger(e)

            if (e.isDefaultPrevented()) return

            $target = $(selector)

            this.activate($this.parent('li'), $ul)
            this.activate($target, $target.parent(), function () {
                $this.trigger({
                    type: 'shown',
                    relatedTarget: previous
                })
            })
        }

        ,
        activate: function (element, container, callback) {
            var $active = container.find('> .active'),
                transition = callback && $.support.transition && $active.hasClass('fade')

                function next() {
                    $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')

                    element.addClass('active')

                    if (transition) {
                        element[0].offsetWidth // reflow for transition
                        element.addClass('in')
                    } else {
                        element.removeClass('fade')
                    }

                    if (element.parent('.dropdown-menu')) {
                        element.closest('li.dropdown').addClass('active')
                    }

                    callback && callback()
                }

            transition ? $active.one($.support.transition.end, next) : next()

            $active.removeClass('in')
        }
    }


    /* TAB PLUGIN DEFINITION
     * ===================== */

    $.fn.tab = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tab')
                if (!data) $this.data('tab', (data = new Tab(this)))
                if (typeof option == 'string') data[option]()
        })
    }

    $.fn.tab.Constructor = Tab


    /* TAB DATA-API
     * ============ */

    $(function () {
        $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    })

}(window.jQuery);

/* =============================================================
 * bootstrap-collapse.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!
function ($) {

    "use strict"; // jshint ;_;
    /* COLLAPSE PUBLIC CLASS DEFINITION
     * ================================ */

    var Collapse = function (element, options) {
            this.$element = $(element)
            this.options = $.extend({}, $.fn.collapse.defaults, options)

            if (this.options.parent) {
                this.$parent = $(this.options.parent)
            }

            this.options.toggle && this.toggle()
        }

    Collapse.prototype = {

        constructor: Collapse

        ,
        dimension: function () {
            var hasWidth = this.$element.hasClass('width')
            return hasWidth ? 'width' : 'height'
        }

        ,
        show: function () {
            var dimension, scroll, actives, hasData

            if (this.transitioning) return

            dimension = this.dimension()
            scroll = $.camelCase(['scroll', dimension].join('-'))
            actives = this.$parent && this.$parent.find('> .accordion-group > .in')

            if (actives && actives.length) {
                hasData = actives.data('collapse')
                if (hasData && hasData.transitioning) return
                actives.collapse('hide')
                hasData || actives.data('collapse', null)
            }

            this.$element[dimension](0)
            this.transition('addClass', $.Event('show'), 'shown')
            this.$element[dimension](this.$element[0][scroll])
        }

        ,
        hide: function () {
            var dimension
            if (this.transitioning) return
            dimension = this.dimension()
            this.reset(this.$element[dimension]())
            this.transition('removeClass', $.Event('hide'), 'hidden')
            this.$element[dimension](0)
        }

        ,
        reset: function (size) {
            var dimension = this.dimension()

            this.$element.removeClass('collapse')[dimension](size || 'auto')[0].offsetWidth

            this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

            return this
        }

        ,
        transition: function (method, startEvent, completeEvent) {
            var that = this,
                complete = function () {
                    if (startEvent.type == 'show') that.reset()
                    that.transitioning = 0
                    that.$element.trigger(completeEvent)
                }

            this.$element.trigger(startEvent)

            if (startEvent.isDefaultPrevented()) return

            this.transitioning = 1

            this.$element[method]('in')

            $.support.transition && this.$element.hasClass('collapse') ? this.$element.one($.support.transition.end, complete) : complete()
        }

        ,
        toggle: function () {
            this[this.$element.hasClass('in') ? 'hide' : 'show']()
        }

    }


    /* COLLAPSIBLE PLUGIN DEFINITION
     * ============================== */

    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('collapse'),
                options = typeof option == 'object' && option
            if (!data) $this.data('collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.collapse.defaults = {
        toggle: true
    }

    $.fn.collapse.Constructor = Collapse


    /* COLLAPSIBLE DATA-API
     * ==================== */

    $(function () {
        $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
            var $this = $(this),
                href, target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
                ,
                option = $(target).data('collapse') ? 'toggle' : $this.data()
                $(target).collapse(option)
        })
    })

}(window.jQuery);

/* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!
function ($) {

    "use strict"; // jshint ;_;
    /* DROPDOWN CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle="dropdown"]',
        Dropdown = function (element) {
            var $el = $(element).on('click.dropdown.data-api', this.toggle)
            $('html').on('click.dropdown.data-api', function () {
                $el.parent().removeClass('open')
            })
        }

    Dropdown.prototype = {

        constructor: Dropdown

        ,
        toggle: function (e) {
            var $this = $(this),
                $parent, selector, isActive

            if ($this.is('.disabled, :disabled')) return

            selector = $this.attr('data-target')

            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
            }

            $parent = $(selector)
            $parent.length || ($parent = $this.parent())

            isActive = $parent.hasClass('open')

            clearMenus()

            if (!isActive) $parent.toggleClass('open')

            return false
        }

    }

    function clearMenus() {
        $(toggle).parent().removeClass('open')
    }


    /* DROPDOWN PLUGIN DEFINITION
     * ========================== */

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('dropdown')
                if (!data) $this.data('dropdown', (data = new Dropdown(this)))
                if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    /* APPLY TO STANDARD DROPDOWN ELEMENTS
     * =================================== */

    $(function () {
        $('html').on('click.dropdown.data-api', clearMenus)
        $('body').on('click.dropdown', '.dropdown form', function (e) {
            e.stopPropagation()
        }).on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    })

}(window.jQuery);

/**
 * ezMark - A Simple Checkbox and Radio button Styling plugin.
 * This plugin allows you to use a custom Image for Checkbox or Radio button. Its very simple, small and easy to use.
 *
 * Copyright (c) Abdullah Rubiyath <http://www.itsalif.info/>.
 * Released under MIT License
 *
 * Files with this plugin:
 * - jquery.ezmark.js
 * - ezmark.css
 *
 * <usage>
 * At first, include both the css and js file at the top
 *
 * Then, simply use:
 *  $('selector').ezMark([options]);
 *
 * [options] accepts following JSON properties:
 *  checkboxCls - custom Checkbox Class
 *  checkedCls  - checkbox Checked State's Class
 *  radioCls    - custom radiobutton Class
 *  selectedCls - radiobutton's Selected State's Class
 *
 * </usage>
 *
 * View Documention/Demo here:
 * http://www.itsalif.info/content/ezmark-jquery-checkbox-radiobutton-plugin
 *
 * @author Abdullah Rubiyath
 * @version 1.0
 * @date June 27, 2010
 */

(function ($) {
    $.fn.ezMark = function (options) {
        options = options || {};
        var defaultOpt = {
            checkboxCls: options.checkboxCls || 'ez-checkbox',
            radioCls: options.radioCls || 'ez-radio',
            checkedCls: options.checkedCls || 'ez-checked',
            selectedCls: options.selectedCls || 'ez-selected',
            hideCls: 'ez-hide'
        };
        return this.each(function () {
            var $this = $(this);
            var wrapTag = $this.attr('type') == 'checkbox' ? '<div class="' + defaultOpt.checkboxCls + '">' : '<div class="' + defaultOpt.radioCls + '">';
            // for checkbox
            if ($this.attr('type') == 'checkbox') {
                $this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function () {
                    if ($(this).is(':checked')) {
                        $(this).parent().addClass(defaultOpt.checkedCls);
                    } else {
                        $(this).parent().removeClass(defaultOpt.checkedCls);
                    }
                });

                if ($this.is(':checked')) {
                    $this.parent().addClass(defaultOpt.checkedCls);
                }
            } else if ($this.attr('type') == 'radio') {

                $this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function () {
                    // radio button may contain groups! - so check for group
                    $('input[name="' + $(this).attr('name') + '"]').each(function () {
                        if ($(this).is(':checked')) {
                            $(this).parent().addClass(defaultOpt.selectedCls);
                        } else {
                            $(this).parent().removeClass(defaultOpt.selectedCls);
                        }
                    });
                });

                if ($this.is(':checked')) {
                    $this.parent().addClass(defaultOpt.selectedCls);
                }
            }
        });
    }
})(jQuery);

(function ($) {
    $.widget("ui.combobox", {
        _create: function () {
            var input, self = this,
                select = this.element.hide(),
                selected = select.children(":selected"),
                value = selected.val() ? selected.text() : "",
                wrapper = this.wrapper = $("<span>").addClass("ui-combobox").insertAfter(select);

            input = $("<input>").appendTo(wrapper).val(value).addClass("ui-state-default ui-combobox-input").autocomplete({
                delay: 0,
                minLength: 0,
                source: function (request, response) {
                    var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                    response(select.children("option").map(function () {
                        var text = $(this).text();
                        if (this.value && (!request.term || matcher.test(text))) return {
                            label: text.replace(
                            new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(request.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"),
                            value: text,
                            option: this
                        };
                    }));
                },
                select: function (event, ui) {
                    ui.item.option.selected = true;
                    self._trigger("selected", event, {
                        item: ui.item.option
                    });
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                            valid = false;
                        select.children("option").each(function () {
                            if ($(this).text().match(matcher)) {
                                this.selected = valid = true;
                                return false;
                            }
                        });
                        if (!valid) {
                            // remove invalid value, as it didn't match anything
                            $(this).val("");
                            select.val("");
                            input.data("autocomplete").term = "";
                            return false;
                        }
                    }
                }
            }).addClass("ui-widget ui-widget-content ui-corner-left");

            input.data("autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
            };

            $("<a>").attr("tabIndex", -1).attr("title", "Show All Items").appendTo(wrapper).button({
                icons: {
                    primary: "ui-icon-triangle-1-s"
                },
                text: false
            }).removeClass("ui-corner-all").addClass("ui-corner-right ui-combobox-toggle").click(function () {
                // close if already visible
                if (input.autocomplete("widget").is(":visible")) {
                    input.autocomplete("close");
                    return;
                }

                // work around a bug (likely same cause as #5265)
                $(this).blur();

                // pass empty string as value to search for, displaying all results
                input.autocomplete("search", "");
                input.focus();
            });
        },

        destroy: function () {
            this.wrapper.remove();
            this.element.show();
            $.Widget.prototype.destroy.call(this);
        }
    });
})(jQuery);
