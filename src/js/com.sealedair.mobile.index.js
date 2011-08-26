
/* **************************************************************** */
/*                  Main Order Display List                         */
/* **************************************************************** */

mobilens.orderList = new Ext.List( {
    cls: 'demo-list',
	width: Ext.Element.getViewportWidth(), //Ext.is.Phone ? undefined : Ext.Element.getViewportWidth(),
	height: Ext.Element.getViewportHeight()-mobilens.orderListHeight, // Ext.is.Phone ? undefined : Ext.Element.getViewportHeight(),   
	//mode: 'SINGLE',
    disableSelection:true,
	store: mobilens.storeSAPOrders,
	//selectedItemCls: 'x-list-noSelect', //'does not exist',  // use this as a css class for selected records
	itemTpl: mobilens.xTplOrdersPrimary,
    //grouped: true,
    //indexBar: true,
    //indexBar: mobilens.myIndexBar,
    
	onItemTap: function(dv, index, item) {
        var myR = this.store.data.items[index];
        
        if (item.getTarget('.itemCount') || item.getTarget('.itemCountTestISS1HI0')  || item.getTarget('.itemCountTestISSHI0') || item.getTarget('.itemCountTestISSHI1') || item.getTarget('.itemCountTestISS1HI1') ) // This if statement determines if the target is to select a list item or execute list item disclosure ...rmJr 2011-04-22 
            {
                if(myR.get('isSelected') == '1')  // This if statement sets a flag field in the datasource to display selected item css  ...rmJr 2011-04-22
                    {myR.set('isSelected',''); }
                else
                    {myR.set('isSelected','1'); }
            } 

        if (item.getTarget('.expand')||item.getTarget('.expandUpdate')||item.getTarget('.expandTest') )
            {	
                mobilens.myIndexBar.makeHidden();
                mobilens.disclose = '1';
                if ( mobilens.storeSAPOrders.getCount() > 1 )
                 { mobilens.orderListSelction = index; }
                myR.set('orderDisclose','1');
                mobilens.storeSAPOrders.filter('orderDisclose','1');
                //this.grouped = false;
                //this.refreshDisplay('expand');
                //this.grouped = true;
                this.refreshDisplay('expand');
            }

        if (item.getTarget('.expanded') )
            {   
                mobilens.myIndexBar.numberSwitch();
                mobilens.disclose = '';
                myR.set('orderDisclose','2');
                mobilens.storeSAPOrders.clearFilter();
                mobilens.orderList.applyShipToFilter();
            }

        if (item.getTarget('.detail') )
        {  myR.set('itemUpdate','1'); }
      },
      
    reGroup: function() {
        this.grouped = false;
        this.refreshDisplay('show');
        this.grouped = true;
        this.refreshDisplay('show');
    },

    monitorOrientation: true,

    refreshDisplay: function(listAction){

        switch ( listAction )
        {
            case 'hideOrders':
                this.bindStore(mobilens.storeMessages);
                this.itemTpl = mobilens.xTplMsgWait; 
                break;
		    case 'expand':
                this.bindStore(mobilens.storeMessages);
                if( Ext.orientation == 'landscape')
				    { this.itemTpl = mobilens.xTplOrdersPrimaryLandscapeExpand; }
                else
                    { this.itemTpl = mobilens.xTplOrdersPrimaryPortraitExpand; }
                this.bindStore(mobilens.storeSAPOrders);
                break;
            default:
                this.bindStore(mobilens.storeMessages);
                
                if ( mobilens.testCheckField.isChecked() === true )
                { this.itemTpl = mobilens.xTplOrdersPrimary; }
                else
                { this.itemTpl = mobilens.xTplOrdersTest; }
                this.bindStore(mobilens.storeSAPOrders);
		}

        this.initComponent();
        this.refresh();		
        if ( listAction === 'expand' )
            { this.scroller.scrollTo({x:0,y:0}); }
        else
            if( mobilens.orderListSelction > 0 )
                { 
                    this.scroller.scrollTo({x:0,y: mobilens.orderListSelction * 103});
                    mobilens.orderListSelction = 0;
                }
		this.width = Ext.Element.getViewportWidth(); //Ext.is.Phone ? undefined : Ext.Element.getViewportWidth(),
        this.height = Ext.Element.getViewportHeight()-mobilens.orderListHeight; // Ext.is.Phone ? undefined : Ext.Element.getViewportHeight(),
    },

    applyShipToFilter: function() {

        db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
                            function (transaction, resultSet) {
								mobilens.orderList.refreshDisplay('hideOrders' );
								
								db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
                                        function (transaction, resultSet) {
											mobilens.storeSAPOrders.clearFilter();
											mobilens.storeSAPShipToCustomers.filter('isSelected','1');
											mobilens.storeSAPOrders.each(function(Orecord){
												var cont = '1';
												mobilens.storeSAPShipToCustomers.each(function(Srecord) {
													
													if ( cont == '1')
														{
													        if( Orecord.get('shipToName')==Srecord.get('firstName') )
														        {
														            Orecord.set('isShipToFiltered','1');
														            cont = '';
														        }
													        else
														        {
															        if( Orecord.get('isShipToFiltered')=='1' )
															        {
																        Orecord.set('isShipToFiltered','');
															        }
														        }
													    }
                                            });	
											});
											
                                        
                                            db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
                                                    function (transaction, resultSet) {
                                                    mobilens.orderList.refreshDisplay('displayOrders' );
                                                    
                                                    //if( mobilens.storeSAPShipToCustomers.getCount() > 0 )
                                                    //{
                                                        mobilens.storeSAPOrders.filter('isShipToFiltered', '1');
                                                        mobilens.orderList.scroller.scrollTo({x:0,y:0});
                                                    //}   
                                                    mobilens.storeSAPShipToCustomers.clearFilter();	
                                                    
                                                db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
                                                    function (transaction, resultSet) {
                                                    
                                                     mobilens.orderList.applyStoreSort( mobilens.orderSort );
                                                 
                                                })});
                                            })});
								})});
					})});
					mobilens.filterPanel.hide();
        
    },

    applyStoreSort: function(t) {
        mobilens.orderList.scroller.scrollTo({x:0,y:0});
        this.refreshDisplay('hide');
        mobilens.storeSAPOrders.sortBy(t);
        this.refreshStorePaging();
        mobilens.storeSAPOrders.clearFilter();
        mobilens.storeSAPOrders.filter('isShipToFiltered', '1');
        mobilens.storeSAPOrders.filter('page', mobilens.currentPage);  
        this.refreshDisplay('');
    },

    refreshStorePaging: function() {
 
        mobilens.lastPage = 1;
        var recCount = 1;
 
        mobilens.storeSAPOrders.each(function(uRecord){
            uRecord.set('page',mobilens.lastPage);
            recCount += 1;
            if ( recCount > mobilens.pageSize )
            {
                mobilens.lastPage += 1;
                recCount = 1;            
            }
        } );
        
        mobilens.myIndexBar.numberSwitch();
    },

	handleOrientation: function(){
		this.refreshDisplay('');
	},
	
	listeners: { orientationchange : function(){ this.handleOrientation(); } }
 
});

/* **************************************************************** */
/*                  User Panel Form Elements                        */
/* **************************************************************** */
mobilens.userNameField = new Ext.form.Text({
	name: 'username',
	label: 'User Name',
	autoCapitalize : false,
	required: true,
	useClearIcon: true
});

mobilens.passwordField = new Ext.form.Password({
	name: 'password',
	label: 'Password',
	autoCapitalize : false,
	required: true,
	useClearIcon: true
});

mobilens.orderTypeSelection = new Ext.form.Select({
    name: 'ProductType',
    label: 'Product Type',
    options: [
        {text: 'Everything',  value: ''},
        {text: 'Equipment Only',  value: 'E'},
        {text: 'Material Only', value: 'M'}
    ]
});

mobilens.testCheckField = new Ext.form.Checkbox({
	label: 'Use Enhanced CSS Display',
    checked: true
});

mobilens.daysOfHistorySlider = new Ext.form.Slider({
	minValue: 0,
	maxValue: 180,
	listeners: {
		scope: this,
		drag: function(x, y, z){
			//console.log('slider changed to : ' + z);
			mobilens.storeDaysOfHistory.removeAll(); 
			mobilens.storeDaysOfHistory.add({isSelected: z,customerName: mobilens.SAMuserStore.first().get('lastResponse') }); 
		},
		change: function(field,newval,oldval){
			//console.log('Days Of History changed to : ' + newval.value);
			field.label = newval.value;
			
			mobilens.storeDaysOfHistory.removeAll(); 
			mobilens.storeDaysOfHistory.add({isSelected: newval.value,customerName: mobilens.SAMuserStore.first().get('lastResponse') });
		}
	}
});

/* **************************************************************** */
/*                  User Panel                                      */
/* **************************************************************** */

mobilens.userCancelButton = new Ext.Button({
    text: 'Cancel',
	handler: function(){
		mobilens.userPanel.toggleUserPanel('0');
	}
});

mobilens.daysOfHistoryList = new Ext.List( {
	height: 80,   
	cls: 'SAMlist',
	mode: 'SINGLE',
	store: mobilens.storeDaysOfHistory,
	//selectedItemCls: 'x-view-selected-rob',  // use this as a css class for selected records
	itemTpl:mobilens.xTplDaysOfHistory,
	
	refreshDisplay: function(listAction){
		
		switch( listAction )
		{
		case 'hide':
			this.bindStore(mobilens.storeMessages);
			this.itemTpl = mobilens.xTplMsgWait; 
			this.initComponent();
			this.refresh();
			break;
		default:
			this.bindStore(mobilens.storeDaysOfHistory);
			this.itemTpl = mobilens.xTplDaysOfHistory; 
			this.initComponent();
			this.refresh();
		}
	}
});

mobilens.userSaveButton = new Ext.Button({
	text: 'Save',
	ui: 'action',
	handler: function() 
		{
        mobilens.saveButton = '1';
		mobilens.daysOfHistoryList.refreshDisplay('hide');
		db.transaction(function(transaction){transaction.executeSql('SELECT "now"', [],
				function (transaction, resultSet) {
					setLoginCredentials( mobilens.userNameField.getValue(), mobilens.passwordField.getValue(), mobilens.daysOfHistorySlider.getValue(), '1',mobilens.orderTypeSelection.getValue(),'','','','');
						if( mobilens.SAMuserStore.first().get('lastResponse') == 'Success')
							{
							db.transaction(function(transaction){transaction.executeSql('SELECT "now"', [],
									function (transaction, resultSet) {
										getShipTo();
										db.transaction(function(transaction){transaction.executeSql('SELECT "now"', [],
												function (transaction, resultSet) {
													getSoldTo();
												
													db.transaction(function(transaction){transaction.executeSql('SELECT "now"', [],
														function (transaction, resultSet) {
															mobilens.daysOfHistoryList.refreshDisplay('');
															mobilens.userPanel.toggleUserPanel('0');
														});
													});
												});
										});
										});
							});
							}
						else
							{   mobilens.storeDaysOfHistory.removeAll(); 
								mobilens.storeDaysOfHistory.add({isSelected: mobilens.daysOfHistorySlider.getValue(),customerName:mobilens.SAMuserStore.first().get('lastResponse') });
								mobilens.daysOfHistoryList.refreshDisplay('');
							}
					});
		});
		}  // end of Save button handler function
});

// Added this code to get the checkbox to work in the Chrome browser
Ext.form.Checkbox.prototype.onChange = function(e) {
    if (e) {
        if (e.browserEvent) {
                e = e.browserEvent;
                }
        if (this.isChecked()) {
                this.fireEvent('check',this);
        } else {
                this.fireEvent('uncheck', this);
                }
            }
};


mobilens.userPanel = new Ext.Panel({
	floating: true,
	centered: true,
	modal: true,
	width: 700,
	height: 475,
    hideOnMaskTap: false,
    
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		title: 'Settings'
	},{
		dock: 'bottom',
		xtype: 'toolbar',
		items: [mobilens.userCancelButton,
		        {xtype: 'spacer'},
				mobilens.userSaveButton]
	}],

	items: [{
		xtype: 'form',
		id: 'userform',
        items:[mobilens.userNameField,
		       mobilens.passwordField,
               mobilens.orderTypeSelection,
               mobilens.testCheckField, 
		       //mobilens.daysOfHistorySlider,
		       mobilens.daysOfHistoryList,
               mobilens.daysOfHistorySlider
		        ]
	}],
	
	toggleUserPanel: function(dMode){
		if( dMode === '1')
			{ 
			mobilens.cancelButton = '';
            mobilens.saveButton = '';
			this.show(); // must call Panel.show() before .setValue() of a Slider field. If not, offsetBoundary error is raised. 
			mobilens.storeDaysOfHistory.removeAll(); 
			mobilens.storeDaysOfHistory.add({isSelected: mobilens.SAMuserStore.first().get('numOfDays'),customerName:mobilens.SAMuserStore.first().get('lastResponse') });
			mobilens.userNameField.setValue( mobilens.SAMuserStore.last().get('userName') );
			mobilens.passwordField.setValue( mobilens.SAMuserStore.last().get('password') );
            mobilens.orderTypeSelection.setValue( mobilens.SAMuserStore.first().get('userConfig1') );
			mobilens.daysOfHistorySlider.setValue( mobilens.SAMuserStore.first().get('numOfDays') );
			}
		else
			{
			mobilens.cancelButton = '1';
			this.hide();
			}
	},
	
	listeners: {
		scope: this,
		beforehide: function(p){
			if( mobilens.SAMuserStore.first().get('lastResponse') != 'Success' && mobilens.cancelButton != '1')
            { alert('returning false'); return false; }
            
            //if( mobilens.saveButton != '1' || mobilens.SAMuserStore.first().get('lastResponse') != 'Success')
            //{
            //    if(  mobilens.cancelButton != '1' )
			//	{ return false; }
            //}
		}
	}
});


/* **************************************************************** */
/*                  Filter Panel                                    */
/* **************************************************************** */

mobilens.filterPanel = new Ext.Panel({
		floating: true,
		centered: true,
		modal: true,
		width: 700,
		height: 600,
        hideOnMaskTap: false,

		dockedItems: [{
			dock: 'top',
			xtype: 'toolbar',
			title: 'Ship To Customer Filter'
		},{
			dock: 'bottom',
			xtype: 'toolbar',
			items: [{
				text: 'Select All', //'Cancel',
                ui: 'action',
				handler: function() {
					//mobilens.filterPanel.hide();
                    mobilens.storeSAPShipToCustomers.filter('isSelected','');
                    mobilens.storeSAPShipToCustomers.each(function(clrRecord){
                        if( clrRecord.get('isSelected') != '1')
                        { clrRecord.toggleSelection(); }
					});
					mobilens.storeSAPShipToCustomers.clearFilter();
				}
			},{
				xtype: 'spacer'
			},{
				text: 'Apply',
				ui: 'action',
				handler: function() {
                    mobilens.orderList.applyShipToFilter();
				}
			},{
				xtype: 'spacer'
			},{
				text: 'Clear Selection', //'Clear Filter',
				ui: 'action',
				handler: function() {
                    
                    db.transaction(function(tx){tx.executeSql('DELETE FROM tblSystemState',[],
                    function(tx,resultsSet){
                        console.log('System state table cleared.'); 
                    },db.onError)});
                    
					//mobilens.storeSAPOrders.clearFilter();
					mobilens.storeSAPShipToCustomers.filter('isSelected','1');
					mobilens.storeSAPShipToCustomers.each(function(clrRecord){
                        if( clrRecord.get('isSelected') === '1')
                        { clrRecord.set('isSelected', ''); }
					});
					mobilens.storeSAPShipToCustomers.clearFilter();
					//mobilens.filterPanel.hide();
				}
			}
			]
		}],

		items: [{
			cls: 'SAMlist',
			items: [{
				height: 457,
				xtype: 'list',
				mode: 'SINGLE',
				store: mobilens.storeSAPShipToCustomers,
				//selectedItemCls: 'x-view-selected-rob',  // use this as a css class for selected records
				itemTpl: mobilens.xTplShipToPrimary,
				grouped: true,
				indexBar: true,
				
				onItemTap: function(dv, index, item) {
					var myR = this.store.data.items[index];
                    myR.toggleSelection();
                    
				} // end of onItemTap

			}]
		}
		        
		        ]  // end of filter panel items   
});








/* **************************************************************** */
/*                  Main Application Object Definition              */
/* **************************************************************** */


Ext.ux.UniversalUI = Ext.extend(Ext.Panel, {
    fullscreen: true,
    id: 'mainTab1',
    layout: 'card',
	cardSwitchAnimation: 
		{
		type: 'slide',
		cover: true
		},
	defaults: 
		{
		//scroll: 'vertical'
		},
    items: [{
    		id: 'robtab01',
        	cls: 'launchscreen',
        	layout: 
        	   {
                type: 'vbox',
                align: 'center',
                pack: 'center'
               },
 
           	dockedItems: [{
          	   dock: 'top',
          	   ui: 'light',
          	   xtype: 'toolbar',
          	   layout: {pack: 'left'},
          	   items: [
          	           
          	           { xtype:'panel', height:'54', width:'164', html:'<p class="logoBar"> &nbsp </p>'}
          	   			,{xtype: 'spacer', width: '150'  }
          	   			,{
         	   				text: '', //'Update',
         	   				xtype: 'button',
         	   				align : 'left',
         	   				iconMask : true,
         	   				iconCls : 'SAMdownload',
         		   			ui: 'action',
         		   			handler: function() 
         		   				{
         		   				mobilens.orderList.refreshDisplay('hideOrders' );
         		   				
         		   				var daysOH = 0;
         		   				daysOH = mobilens.SAMuserStore.first().get('numOfDays').valueOf();
         		   				daysOH = -1 * daysOH
         		   				var d1 = new Date();
                                d1.adjust(0, 0, daysOH, 0, 0, 0); 
         		   				var d2 = new Date();
         		   				
         		   				var beginStr = String(d1.getFullYear()) + '-' + String(d1.getMonth()+1) + '-' + String(d1.getDate());
         		   				var endStr = String(d2.getFullYear()) + '-' + String(d2.getMonth()+1) + '-' + String(d2.getDate());
         		   			         		   				
         		   				db.transaction(function(tx)
		   								{
         		         		   			db.transaction(function(tx)
         		   	   							{
         		            		   				soapSAPLogin( mobilens.SAMuserStore.first().get('userName'), mobilens.SAMuserStore.first().get('password'), '1');
         		            		   			
         		            		   				db.transaction(function(tx)
         		          		   						{
         		            		   						//soapSAPOrders('2010-04-10', '2010-04-10', mobilens.SAMuserStore.first().get('userName'), mobilens.SAMuserStore.first().get('password'));
         		            		   						soapSAPOrders(beginStr, endStr, mobilens.SAMuserStore.first().get('userName'), mobilens.SAMuserStore.first().get('password'), mobilens.SAMuserStore.first().get('userConfig1'));
                 		            		   				db.transaction(function(tx)
                 		              		   						{
                 		              		   							getOrderData();
                 		              		   							
                 		              		   							db.transaction(function(tx)
                         		              		   						{
                                                                                mobilens.orderList.refreshDisplay('displayOrders' );      
                 		              		   									
                                                                                      
                                                                                db.transaction(function(tx)
                         		              		   						    {
                 		              		   									    mobilens.orderList.applyShipToFilter();
                                                                                    mobilens.orderList.scroller.scrollTo({x:0,y:0});
                         		              		   							    getShipTo();
                         		              		   						    });      
                         		              		   						});
                 		              		   						});
         		          		   						});
         		            		   				});
		   								});

         		   				}  // end of the button handler function
         	           }  // end of the Update button configuration
         	           ,{
          	        	   //text: 'Filter Button',
        	   				text: '',
          	   				xtype: 'button',
          	   				align : 'left',
          	   				iconMask : true,
          	   				iconCls : 'search',

          	        	   ui: 'action',
          	        	   handler: function() {
          	        		   mobilens.filterPanel.show(); 
          	        		   mobilens.storeSAPShipToCustomers.clearFilter();
//         					   if( mobilens.activeFiltersOnly == '1')
//          							{ 
//          								mobilens.storeSAPShipToCustomers.filter('isSelected','1');
//          							}
          						
          	        		   mobilens.storeSAPShipToCustomers.sort('firstName','ASC');
          	        	   	}
          	           },{ 
          	        	    //text: 'Get Details',
         	   				text: '',
          	   				xtype: 'button',
          	   				align : 'left',
          	   				iconMask : true,
          	   				iconCls : 'SAMdetail',

          	        	   ui: 'action',
          	        	   handler: function() {
          	        		   
          	        		 var orderList = []; 
          	        		   
          	        		 db.transaction(function(tx)
          	        			{	mobilens.orderList.refreshDisplay('hideOrders' );
          	        			
          	        				db.transaction(function(tx)
		   								{	mobilens.storeSAPOrders.clearFilter();
		   									mobilens.storeSAPOrders.filter('isSelected', '1');
		   									if ( mobilens.storeSAPOrders.getCount() < 1)
		   										{ 
		   										mobilens.storeSAPOrders.clearFilter(); 
                                                if( mobilens.disclose === '1')
                                                { 
                                                    mobilens.storeSAPOrders.filter('orderDisclose','1');
                                                    mobilens.orderList.refreshDisplay('expand');
                                                }
                                                else
                                                {
    	   										    mobilens.orderList.refreshDisplay('displayOrders' );
                                                    mobilens.orderList.applyShipToFilter();                                                    
                                                }
		   										Ext.Msg.width = 280;
		   										Ext.Msg.alert('Update Order Items', 'Please select one or more orders.');
		   										}
		   									else
		   										{
		   										//SACCRM.Main.ui.items.items[0].items.items[0].scroller.scrollTo({x:0,y:0});
		   										
		   										mobilens.storeSAPOrders.each(function(record) {
		   											var orderRecDetailNumber = record.get("documentNumber");
		   											var recIndex = record.store.indexOf(record);
		   											orderList[recIndex] = orderRecDetailNumber;
		   										});
		   								
		   										db.transaction(function(tx)
		   												{	soapSAPLogin( mobilens.SAMuserStore.first().get('userName'), mobilens.SAMuserStore.first().get('password'),'0');
		   													db.transaction(function(tx)
		   															{	soapSAPOrderDetails( mobilens.SAMuserStore.first().get('userName'), mobilens.SAMuserStore.first().get('password'),orderList);
		   																db.transaction(function(tx)
		   																		{	getOrderDetail ('');
		   																			db.transaction(function(tx)
		   																					{	mobilens.storeSAPOrders.clearFilter();
		   																						db.transaction(function(tx)
		   																								{	mobilens.orderList.refreshDisplay('displayOrders' );
                                                                                                           mobilens.orderList.applyShipToFilter();
                                     		              		   						}); }); }); }); });
		   										} // end of ELSE statement for getCount < 1
		   								}); });  // end of this db transaction string
          	        	   }  // end of get detail button handler
          	           } // end of get details button definition
          	           ,{ 		xtype: 'selectfield',
          	        	   		prependText: 'Sort by:',
          	        	   		name: 'myroboptions',
          	        	   		listeners: {
          	        	   			change: function(e, v){
                                        //myIndexBar.numberSwitch();
                                        //myIndexBar.refresh();
                                        //mobilens.orderList.indexBar = myIndexBarNumbers;
                                      
                                        //mobilens.orderList.indexBar.hide();
                                        //mobilens.orderList.indexBar.numberSwitch();
                                        //mobilens.storeSAPOrders.sortBy(v);
                                        mobilens.orderList.applyStoreSort(v);
                                        //mobilens.orderList.indexBar.refresh();
                                        //mobilens.orderList.indexBar.show();

                                        //mobilens.orderList.scroller.scrollTo({x:0,y:0});
                                        //mobilens.orderList.reGroup();
          	        	   				},
          	        	   			scope: this
          	        	   		},
          	        	   		options: [
          	        	   		          	{text: 'Sort by:',value:''},
          	        	   		          	{text: ' Order Number',value:'documentNumberTrim'},
         	   						        {text: ' Ship To Name', value:'shipToName'},
         	   						        {text: ' Sold To Name', value:'soldToName'},
         	   						        {text: ' Requested Delivery Date', value:'requestedDeliveryDate'},
                                            {text: ' Document Date', value:'documentDate'},
         	   						        //{text: ' Order Status', value:'status'},
         	   						         ]
          	           },{
          	        	    //text: 'Settings',
          	        	   	text: '',
        	   				xtype: 'button',
        	   				align : 'left',
        	   				iconMask : true,
        	   				iconCls : 'SAMg',
        		   			ui: 'action',
        		   			handler: function() 
        		   				{
        		   					mobilens.userPanel.toggleUserPanel('1');
        		   				}  
        	           } // end of settings item config
           	] }],

          	          items: [
                            mobilens.myIndexBar,
                            mobilens.orderList
                            ]
               
           	}],  // End of 'items:' for the main tab panel
});  // end of application object extended definition

/* **************************************************************** */
/*                  Main Application Object Instantiation           */
/* **************************************************************** */

SACCRM.Main = {
    init : function()
    	{ 
    	this.ui = new Ext.ux.UniversalUI();
        mobilens.orderList.applyStoreSort(''); //note: passing in an emptry string to this function will sort the list by its default field...rmJr
        mobilens.storeSAPOrders.sortBy('') //note: passing in an emptry string to this function will sort the list by its default field...rmJr
    	mobilens.orderList.refreshDisplay('');
        //mobilens.orderList.scroller.momentum = false;
        //mobilens.orderList.scroller.acceleration = 40;
        //mobilens.orderList.scroller.friction = 0.05;
        //mobilens.orderList.scroller.fps = 70;        
        
    	}
			};

Ext.setup({
    tabletStartupScreen: Ext.orientation == 'landscape' ? 'CRM_mobile_splash_1024_748.png' : 'CRM_mobile_splash_768_1004.png' ,
    phoneStartupScreen: Ext.orientation == 'landscape' ? 'CRM_mobile_splash_640_960.png' : 'CRM_mobile_splash_320_460.png' ,
    icon: '9DOTS_WHT_57.png',
    glossOnIcon: true,

    onReady: function() 
      {
//    	alert(' and the magic 8 ball says ... ' + Ext.orientation ) ;
//    	alert(' with a side chance of : ' + Ext.Viewport.getOrientation() );
  		/* We are calling getOrderData here so that the store is populated and ready for the list before the list object is rendered...rmJr 2011-05-02 */    	
    	  db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
               function (transaction, resultSet) {
    		  	  getLoginCredentials();
    				db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
      					function (transaction, resultSet) {
      						getOrderData();
      						db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
      								function (transaction, resultSet) {
                                        mobilens.orderList.refreshStorePaging();
      									getSoldTo();
      									db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
      											function (transaction, resultSet) {
      												getShipTo();
      		      									db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
      		      											function (transaction, resultSet) {
      		      												SACCRM.Main.init();
      		      		      									db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
      		      		      											function (transaction, resultSet) {
      		      		      											//	mobilens.orderList.refreshDisplay('');
                                                                               mobilens.orderList.applyShipToFilter();
      		      		      												} 
      		      		      										);
      		      		      									}, db.onError);  // end of SACCRM.Main.init(); onSuccess function
      		      												} 
      		      										);
      		      									}, db.onError);  // end of SACCRM.Main.init(); onSuccess function
      										});
      									}, db.onError);  // end of ship to transaction onSuccess function
      							});
      						}, db.onError);  // end of sold to transaction onSuccess function
      					});
      			}, db.onError);  // end of order header transaction onSuccess function
             });
  		 }, db.onError);  // end of SACCRM.Main.init(); onSuccess function
	
      } // end of onReady
});
