Ext.IndexBar = Ext.extend(Ext.DataPanel, {
    cmpCls: 'x-indexbar',
    direction: 'vertical',
    tpl: '<tpl for="."><span class="x-indexbar-item">{value}</span></tpl>',
    itemSelector: 'span.x-indexbar-item',
    
    /**
     * @cfg {Array} letters
     * The letters to show on the index bar. Defaults to the English alphabet, A-Z.
     */
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    // @private
    initComponent : function() {
        // No docking and no sizing of body!
        this.componentLayout = new Ext.layout.AutoComponentLayout();

        if (!this.store) {
            this.store = new Ext.data.Store({
                model: 'IndexBarModel'
            });
        }

        if (this.alphabet == true) {
            this.ui = this.ui || 'alphabet';
        }

        if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }

        this.addEvents('index');

        Ext.IndexBar.superclass.initComponent.call(this);
    },

    // @private
    afterRender : function() {
        Ext.IndexBar.superclass.afterRender.call(this);

        if (this.alphabet === true) {
            this.loadAlphabet();
        }

        if (this.vertical) {
            this.el.addClass(this.cmpCls + '-vertical');
        }
        else if (this.horizontal) {
            this.el.addClass(this.cmpCls + '-horizontal');
        }
    },

    // @private
    loadAlphabet : function() {
        var letters = this.letters,
            len = letters.length,
            data = [],
            i, letter;

        for (i = 0; i < len; i++) {
            letter = letters[i];
            data.push({key: letter.toLowerCase(), value: letter});
        }

        this.store.loadData(data);
    },

    // @private
    initEvents : function() {
        Ext.IndexBar.superclass.initEvents.call(this);

        this.mon(this.body, {
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            touchmove: this.onTouchMove,
            scope: this
        });
    },

    // @private
    onTouchStart : function(e, t) {
        this.el.addClass(this.cmpCls + '-pressed');
        this.pageBox = this.body.getPageBox();
        this.onTouchMove(e);
    },

    // @private
    onTouchEnd : function(e, t) {
        this.el.removeClass(this.cmpCls + '-pressed');
    },

    // @private
    onTouchMove : function(e) {
        var target,
            me = this,
            record,
            pageBox = me.pageBox;
            
        if (!pageBox) {
            pageBox = me.pageBox = me.body.getPageBox();
        }

        if (me.vertical) {
            if (e.pageY > pageBox.bottom || e.pageY < pageBox.top) {
                return;
            }
            target = Ext.Element.fromPoint(pageBox.left + (pageBox.width / 2), e.pageY);
        }
        else if (me.horizontal) {
            if (e.pageX > pageBox.right || e.pageX < pageBox.left) {
                return;
            }
            target = Ext.Element.fromPoint(e.pageX, pageBox.top + (pageBox.height / 2));
        }

        if (target) {
            record = me.getRecord(target.dom);
            if (record) {
                me.fireEvent('index', record, target, me.indexOf(target));
            }
        }
    }
});

Ext.reg('indexbar', Ext.IndexBar);

Ext.regModel('IndexBarModel', {
    fields: ['key', 'value']
});
