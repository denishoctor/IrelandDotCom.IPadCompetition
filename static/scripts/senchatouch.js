Ext.ns('ipadComp');

ipadComp.Main = {
    init: function () {

        var toolbar = new Ext.Toolbar({
            cls: 'maintoolbar',
            dock: 'bottom',
            xtype: 'toolbar',
            ui: 'light',
            title: 'Win an iPad: Simply find Drumshanbo Town',
            items: [{ xtype: 'spacer' }, {
                text: 'Done',
                ui: 'normal',
                handler: function (button, event) {
                    if (checkLatLng(ipadComp.marker.getPosition()))
                        ipadComp.overlay.show();
                }
            }]
        });

        var toolbartop = new Ext.Toolbar({
            dock: 'top',
            xtype: 'toolbar',
            ui: 'dark',
            html: '<img id="logo" src="/static/images/irelanddotcomlogo.png" />'
        });

        var myOptions = {
            disableDefaultUI: true,
            zoom: 7,
            center: new google.maps.LatLng(53.4017544, -7.9369354),
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        ipadComp.mapWrapper = new Ext.Map({ mapOptions: myOptions });

        ipadComp.detailMap = new Ext.Panel({
            cls: 'mainpanel',
            fullscreen: true,
            dockedItems: [toolbar, toolbartop],
            items: [ipadComp.mapWrapper]
        });


        ipadComp.marker = new google.maps.Marker({
            position: new google.maps.LatLng(0, 0),
            map: ipadComp.mapWrapper.map,
            icon: '/static/images/map-icon.png'
        });

        google.maps.event.addListener(ipadComp.mapWrapper.map, 'click', function (event) {
            if (event.latLng) {
                ipadComp.marker.setPosition(event.latLng);
            }
        });


        ipadComp.overlay = new Ext.Panel({
            cls: 'overlay',
            floating: true,
            modal: true,
            centered: true,
            width: 420,
            height: 180,
            styleHtmlContent: true,
            dockedItems: new Ext.Toolbar({
                dock: 'top',
                title: 'Enter your email',
                items: [{ xtype: 'spacer' }, {
                    text: 'Done',
                    ui: 'normal',
                    handler: function (button, event) {
                        var userEmail = document.getElementById('email').value;
                        var userName = document.getElementById('name').value;
                        if (checkEmail(userEmail)) {
                            //console.log(userEmail + ' ' + ipadComp.mapWrapper.map.getCenter().lat() + ' ' + ipadComp.mapWrapper.map.getCenter().lng());

                            Ext.Ajax.request({
                                url: '/home/Entries?entry=' + userName + ',' + userEmail + ',' + ipadComp.marker.getPosition().lat() + ',' + ipadComp.marker.getPosition().lng(),
                                success: function (response, opts) {
                                    ipadComp.overlay.body.dom.innerHTML = '<div style="font-size:1.25em;padding:1.2em;">Your entry has been completed!</div>';

                                    setTimeout(function () {
                                        ipadComp.overlay.hide();

                                        ipadComp.marker.setPosition(new google.maps.LatLng(0, 0));
                                        ipadComp.mapWrapper.map.setCenter(new google.maps.LatLng(53.4017544, -7.9369354));
                                        ipadComp.mapWrapper.map.setZoom(7);

                                        ipadComp.overlay.body.dom.innerHTML = '<div id="ext-gen1025" class=" x-scroller x-htmlcontent" style="min-height: 120px; width: 408px; "><label>Name:</label> <input id="name" type="text" /><br /><label>Email:</label> <input id="email" type="text" /></div></div>';
                                    }, 2500);
                                }
                            });
                        }
                    }
                }]
            }),
            scroll: 'vertical',
            html: '<label>Name:</label> <input id="name" type="text" /><br /><label>Email:</label> <input id="email" type="text" />',
            cls: 'htmlcontent'
        });
    }
}

Ext.setup({
    tabletStartupScreen: '/tablet_startup.png',
    phoneStartupScreen: '/phone_startup.png',
    icon: '/icon.png',
    glossOnIcon: false,
    onReady: function () {
        ipadComp.Main.init();
    }
});

function checkEmail(email) {
    var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (!pattern.test(email)) {
        alert("Please provide a valid email address");
        return false;
    }
    return true;
}

function checkLatLng(latLng) {
    if (latLng.lat() === 0 && latLng.lng() === 0) {
        alert("Please provide a valid map location within Ireland by tapping the map. You should see an icon appear.");
        return false;
    }
    return true;
}