/**
 * @class Ext.layout.FitLayout
 * @extends Ext.layout.ContainerLayout
 * <p>This is a base class for layouts that contain <b>a single item</b> that automatically expands to fill the layout's
 * container.  This class is intended to be extended or created via the <tt>layout:'fit'</tt> {@link Ext.Container#layout}
 * config, and should generally not need to be created directly via the new keyword.</p>
 * <p>FitLayout does not have any direct config options (other than inherited ones).  To fit a panel to a container
 * using FitLayout, simply set layout:'fit' on the container and add a single panel to it.  If the container has
 * multiple panels, only the first one will be displayed.</p>
 */
Ext.layout.FitLayout = Ext.extend(Ext.layout.ContainerLayout, {
    extraCls: 'x-fit-item',
    targetCls: 'x-layout-fit',
    type: 'fit',
    
    // @private
    onLayout : function(owner, target) {            
        Ext.layout.FitLayout.superclass.onLayout.call(this, owner, target);
        if (owner.items.length > 0) {
            this.setItemBox(owner.items.items[0], this.getTargetBox());
        }
    },

    // @private
    setItemBox : function(item, box) {
        if (item && box.height > 0) {
            box.width -= item.el.getMargin('lr');
            box.height -= item.el.getMargin('tb');
            item.setSize(box);
            item.setPosition(box);
        }
    }
});

Ext.layout.TYPES['fit'] = Ext.layout.FitLayout;
