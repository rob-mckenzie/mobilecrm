// # ver 259

var db = openDatabase("Mobile Order Status", "1.0", "Mobile Order Status", 50*1024*1024);
var orderInfo = [];

db.onError = function(tx, e) {
      alert('Something unexpected happened: ' + e.message );
	};

db.onSuccess = function(tx, r) {
	  // re-render all the data
	  // loadTodoItems is defined in Step 4a
	 //alert(r);
	 //tx.executeSql('DELETE FROM tblOrders2 where tblOrders2.ordernum !='+r);
	// console.log(r); 
	};

db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblLogin (username TEXT,password TEXT, daysOfHistory TEXT, lastResponse TEXT,refreshed TEXT)',[],[],db.onError)});
db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS '+mobilens.tblLogin+' (username TEXT,password TEXT, daysOfHistory TEXT, lastResponse TEXT,refreshed TEXT, userConfig1 TEXT, userConfig2 TEXT, userConfig3 TEXT, userConfig4 TXT, userConfig5 TXT)',[],
    function(tx,resultsSet){
        db.transaction(function(tx){tx.executeSql('INSERT INTO '+mobilens.tblLogin+'(username,password, daysOfHistory, lastResponse, refreshed) SELECT username,password, daysOfHistory, lastResponse, refreshed FROM tblLogin',[],
            function(tx,resultsSet){
                db.transaction(function(tx){tx.executeSql('DELETE FROM tblLogin',[],
                    function(tx,resultsSet){
                        console.log('user table upgrade complete.');  //DELETE FROM tblSystemState 
                    },db.onError)});
            },db.onError)});
    },db.onError)});


db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblSoldTo (soldto TEXT,JSONSoldTo TEXT,refreshed TEXT)',[],[],db.onError)});
db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblSalesArea (salesorg TEXT, division TEXT, distchannel,JSONSalesArea TEXT,refreshed TEXT)',[],[],db.onError)});
db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblShipTo (shipto TEXT,salesorg TEXT, division TEXT, distchannel TEXT, JSONShipTo TEXT,refreshed TEXT)',[],[],db.onError)});
db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblOrders (ordernum TEXT,JSONOrderHeader TEXT,refreshed TEXT)',[],[],db.onError)});
db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblOrders2 (ordernum TEXT,JSONOrderHeader2 TEXT,refreshed TEXT)',[],[],db.onError)});
db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblDetails (ordernum TEXT, itemnum TEXT,JSONOrderDetail TEXT,refreshed TEXT)',[],[],db.onError)});
db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblDeliveries (ordernum TEXT, itemnum TEXT,deliverynum TEXT, JSONDeliveryDetail TEXT,refreshed TEXT)',[],[],db.onError)});
db.transaction(function(tx){tx.executeSql('CREATE TABLE IF NOT EXISTS tblSystemState (recordType TEXT, recordStatus TEXT,recordValue1 TEXT, recordValue2 TEXT,recordValue3 TEXT)',[],[],db.onError)});

function getLoginCredentials() {

	var loginQry = 'select \'{"userName":"\' || ifNull(username,\'\') || \'","password":"\' || ifNull(password,\'\') || \'","numOfDays":"\' || ifNull(daysOfHistory,\'0\') || \'","lastResponse":"\' || ifNull(lastResponse,\'empty\') || \'","userConfig1":"\' || ifNull(userConfig1,\'\') || \'","userConfig2":"\' || ifNull(userConfig2,\'\') || \'","userConfig3":"\' || ifNull(userConfig3,\'\') || \'","userConfig4":"\' || ifNull(userConfig4,\'\') || \'","userConfig5":"\' || ifNull(userConfig5,\'\') || \'"}\' as creds FROM ' + mobilens.tblLogin;
		
	db.transaction(function(transaction){transaction.executeSql(loginQry, [],
			function (transaction, resultSet) {
				for (var i=0; i<resultSet.rows.length; i++) {
					var row = resultSet.rows.item(i);   
					orderInfo[i] = [row["creds"], ];
					mobilens.SAMuserStore.add(JSON.parse(orderInfo[i]));
				}
				
				if( mobilens.SAMuserStore.getCount() < 1 )
					{ mobilens.SAMuserStore.add({userName: '',password: '',lastUpdated:'', numOfDays:'0',lastResponse:'empty'});
					toggleUserPanel('1');
					}
				}
		);
	}
  );
}

function setLoginCredentials(newUser, newPass, daysOfHistory, getBaseData, userCfg1, userCfg2, userCfg3, userCfg4, userCfg5) {

	var tmpResponse = soapSAPLogin(newUser, newPass, getBaseData);
	
	// if there are no records add a new one
	if ( mobilens.SAMuserStore.getCount() < 1)
		{ mobilens.SAMuserStore.add({userName:newUser,password:newPass,numOfDays:'15',lastResponse:tmpResponse});
		}
	mobilens.SAMuserStore.each(function(uRecord){
			uRecord.set('userName',newUser);
			uRecord.set('password',newPass);
			if (daysOfHistory > 0)
				{ uRecord.set('numOfDays',daysOfHistory); }
			uRecord.set('lastResponse',tmpResponse);
            uRecord.set('userConfig1',userCfg1);
            uRecord.set('userConfig2',userCfg2);
            uRecord.set('userConfig3',userCfg3);
            uRecord.set('userConfig4',userCfg4);
            uRecord.set('userConfig5',userCfg5);
			uRecord.refreshResponse();
		    } );
}	
	
function getOrderDetail (sTarget) {
	
	mobilens.storeSAPOrders.each(function(record) {

		var orderRecDetailNumber = record.get("documentNumber");
		var detailQry = 'SELECT *, ?, ? from  tblDetails where ordernum = ?';
		var recIndex = record.store.indexOf(record);

		db.transaction(function(transaction){transaction.executeSql(detailQry, [recIndex,sTarget,orderRecDetailNumber],
				function (transaction, resultSet) {
						var returnL = resultSet.rows.length;
						if( returnL > 0 )
							{
								var currRec = mobilens.storeSAPOrders.data.items[parseInt(recIndex,10)];
                                currRec.set('itemCount',  returnL);
								currRec.set('hasItems',  '1');
								if (currRec.get('documentNumber') == sTarget )
									{
										currRec.set('orderDisclose',  '3');
									}
								else
									{
										currRec.set('orderDisclose',  '');
									}
								currRec.set('isSelected',  '');
								currRec.set('itemUpdate',  '');
							
								var ascStore = currRec.orderItems();
								ascStore.removeAll();
								
								for (var k=0; k<resultSet.rows.length; k++) {
										var row = resultSet.rows.item(k);
										var newRecord = ascStore.add(JSON.parse([row["JSONOrderDetail"], ]));
                                        newRecord[0].formatData( currRec.get('documentNumber'), currRec.get('shipToName'), currRec.get('soldToName'), currRec.get('requestedDeliveryDate'), currRec.get('documentDate')  );
										
										if ( k===0 ) 
										{
											var crazyTrain = new Date([row.refreshed ] );
                                            //var crazyTrain = new Date([row["refreshed"], ] );
											currRec.set('itemsRefreshed', crazyTrain.getFullYear() + '-' + crazyTrain.getMonth() + '-' + crazyTrain.getDate() + ' ' + crazyTrain.toLocaleTimeString() );
											
										}
										}
							}
					});
		});  // end of the "Order Detail" load
				
		var extendedQry = 'SELECT *, ?, ? from  tblOrders2 where ordernum = ?';
		
		db.transaction(function(transaction){transaction.executeSql(extendedQry, [recIndex,sTarget,orderRecDetailNumber],
				function (transaction, resultSet) {
						var returnL = resultSet.rows.length;
						if( returnL > 0 )
							{
								var ascExtenedStore = new Ext.data.Store({model: 'modelSapOrders2'});
							
								for (var k=0; k<resultSet.rows.length; k++) {
										var row = resultSet.rows.item(k);
										var newRecord = ascExtenedStore.add(JSON.parse([row["JSONOrderHeader2"], ]));
										newRecord[0].transferData(recIndex);
										}
							}
					});
		}); // end of the "Extended Order Data" load
		
	});  // end of the primary "each" loop
};


function getOrderData () {
	
	mobilens.storeSAPOrders.removeAll();
	
	db.transaction(function(transaction){transaction.executeSql('SELECT * from tblOrders', [],
				function (transaction, resultSet) {
					for (var i=0; i<resultSet.rows.length; i++) {
						var row = resultSet.rows.item(i);   
						orderInfo[i] = [row["JSONOrderHeader"], ];

						var newRec = mobilens.storeSAPOrders.add(JSON.parse(orderInfo[i]));
						newRec[0].formatData( [row["refreshed"], ] );
					   } // end of order header for loop
                       
                       console.log(resultSet.rows.length + ' orders added to Store!');
                       
                       db.transaction(function(transaction){transaction.executeSql('SELECT COUNT(*) from tblOrders', [],
                            function (transaction, resultSet) {
				                getOrderDetail ();
				            } // end of order header transaction onSuccess function
		                );
	                    }); 
                       
					} // end of order header transaction onSuccess function
			);
		});


}



function getSoldTo() {

	mobilens.storeSAPSoldToPartners.removeAll();
	
	db.transaction(function(transaction){transaction.executeSql('SELECT * from tblSoldTo', [],
				function (transaction, resultSet) {
					for (var i=0; i<resultSet.rows.length; i++) {
						var row = resultSet.rows.item(i);   
						orderInfo[i] = [row["JSONSoldTo"], ];
						//alert(orderInfo[i]);
						mobilens.storeSAPSoldToPartners.add(JSON.parse(orderInfo[i]));
					}
					console.log(resultSet.rows.length + ' Sold To partners added to Store!');
					}
			);
		}
	);
}

function getShipTo() {

	mobilens.storeSAPShipToCustomers.removeAll();
	
	db.transaction(function(transaction){transaction.executeSql('SELECT * from tblShipTo', [],
				function (transaction, resultSet) {
					for (var i=0; i<resultSet.rows.length; i++) {
						var row = resultSet.rows.item(i);   
						orderInfo[i] = row.JSONShipTo;
						//alert(orderInfo[i]);
						var thisWreck = mobilens.storeSAPShipToCustomers.add(JSON.parse(orderInfo[i]));
                        // write the name out to a global variable
                        mobilens.currShipToInsert = thisWreck[0].get('firstName');
                        mobilens.currShipToSelection = '';
                        
                        // run loop and set global variable
                        mobilens.storeShipToChoices.each(function(trec){
                          if(  trec.get('filteredShipTo') === mobilens.currShipToInsert )
                          {
                           mobilens.currShipToSelection = '1';   
                          }
                        });
                        
                        thisWreck[0].set('isSelected', mobilens.currShipToSelection);
					}
					console.log(resultSet.rows.length + ' Ship To partners added to Store!');
					}
			);
		}
	);
}

function getOrderData2() {
	
	db.transaction(function(transaction){transaction.executeSql('SELECT * from tblOrders2', [],
				function (transaction, resultSet) {
					for (var i=0; i<resultSet.rows.length; i++) {
						var row = resultSet.rows.item(i);   
						orderInfo[i] = [row["JSONOrderHeader2"], ];
						//alert(orderInfo[i]);
						mobilens.storeSAPOrders2.add(JSON.parse(orderInfo[i]));
					}
					console.log(resultSet.rows.length + ' Orders2 added to Store!');
					}
			);
		}
	);
};

function getOrderDeliveries() {
	db.transaction(function(transaction){transaction.executeSql('SELECT * from tblDeliveries', [],
				function (transaction, resultSet) {
					for (var i=0; i<resultSet.rows.length; i++) {
						var row = resultSet.rows.item(i);   
						orderInfo[i] = [row["JSONDeliveryDetail"], ];
						//alert(orderInfo[i]);
						var dRecNew = mobilens.storeSAPDeliveries.add(JSON.parse(orderInfo[i]));
						dRecNew[0].set('ordernum',[row["ordernum"], ]);
						dRecNew[0].set('itemnum',[row["itemnum"], ]);
					}
					console.log(resultSet.rows.length + ' Deliveries added to Store!');
					}
			);
		}
	);
};

mobilens.calculateDesiredWidth = function() {
	var viewWidth = Ext.Element.getViewportWidth(),
	desiredWidth = 700;  //Math.min(viewWidth, 500) - 10;
	return desiredWidth;
	}; 

mobilens.deliveryList = new Ext.List({
	cls: 'SAMlist',
	//width: 700, //Ext.Element.getViewportWidth(), //Ext.is.Phone ? undefined : Ext.Element.getViewportWidth(),
	height: 450, // Ext.is.Phone ? undefined : Ext.Element.getViewportHeight(),  
	//id: 'soldToPartnerList',
	xtype: 'list',
	mode: 'SINGLE',
	store: mobilens.storeSAPDeliveries,
	selectedItemCls: 'x-view-selected-rob',  // use this as a css class for selected records
	itemTpl:mobilens.xTplItemDelivery,
/*
	onItemTap: function(dv, index, item) {
		var myR = this.store.data.items[index];
				
		if (item.getTarget('.itemCount') ) // This if statement determines if the target is to select a list item or execute list item disclosure ...rmJr 2011-04-22
		{  
                       if(myR.get('isSelected') == '1')  // This if statement sets a flag field in the datasource to display selected item css  ...rmJr 2011-04-22
                             {myR.set('isSelected',''); }
                       else
                             {myR.set('isSelected','1'); }
             } ;
		}

*/		
	
})	
	

mobilens.deliveryPnl = new Ext.Panel({
	floating: true,
	centered: true,
	modal: true,
	width: mobilens.calculateDesiredWidth(),
	height: 650,

	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		title: 'Deliveries'
	},{
		dock: 'bottom',
		xtype: 'toolbar',
		layout: 
    	   {
            type: 'vbox',
            align: 'center',
            pack: 'center'
           },
		items: [{
			text: 'Close',
			handler: function() {
				mobilens.storeSAPDeliveries.clearFilter();
				mobilens.deliveryPnl.hide();
			}
		}]
	}],

	items: [ {html:'<center><b>Test</b></center>'},mobilens.deliveryList ]  // end of settings panel items   
});




function displayOrderItemDelivery(orderNum, itemNum, shippedFrom, tVolume, tWeight) {
	db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
			function (transaction, resultSet) {
					if ( mobilens.storeSAPDeliveries.getCount() < 1 )
							{
								mobilens.storeSAPDeliveries.removeAll();
								getOrderDeliveries();
							}
					
					db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
							function (transaction, resultSet) {
									mobilens.storeSAPDeliveries.clearFilter();
									mobilens.storeSAPDeliveries.filter('ordernum',orderNum);
									mobilens.storeSAPDeliveries.filter('itemnum',itemNum);
									
									db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
											function (transaction, resultSet) {
												if ( mobilens.storeSAPDeliveries.getCount() < 1 )
													{
													mobilens.deliveryList.bindStore(mobilens.storeMessages);
													mobilens.deliveryList.itemTpl = mobilens.xTplMsgNoDelivery; 
													mobilens.deliveryList.initComponent();
													mobilens.deliveryList.refresh();
													}
												else
													{
													mobilens.deliveryList.bindStore(mobilens.storeSAPDeliveries);
													mobilens.deliveryList.itemTpl = mobilens.xTplItemDelivery; 
													mobilens.deliveryList.initComponent();
													mobilens.deliveryList.refresh();
													}										
									});
									});
									
								db.transaction(function(transaction){transaction.executeSql('SELECT "now" ', [],
											function (transaction, resultSet) {
//												mobilens.deliveryPnl.items.items[0].html = '';
												mobilens.deliveryPnl.items.items[0].html = '<p class="deliveryHeaderspacer">&nbsp</p><table class="deliveryTBLport" summary=""><caption></caption><thead>'+
												'<tr><th scope="col" class="detailTH">Shipped From</th><th scope="col" class="detailTH">Total Line Volume</th><th scope="col" class="detailTH">Total Line Weight</th>'+
												'</tr></thead><tbody><tr><td class="detailT">'+shippedFrom+'</td><td class="detailT">'+tVolume+'</td><td class="detailT">'+tWeight+'</td></tr></tbody></table><p class="deliveryHeaderspacer">&nbsp</p>';
																								
												mobilens.deliveryPnl.show();
												//displayPanel.show();
								});
								});  // end of show transaction
					});
					});  // end of store binding transaction
	});
	});  // end of populate store transaction

}

function refreshOrderLine(orderNumber){
		// need to add a login check here that does not execute unless login verifies success.
		
		db.transaction(function(transaction){transaction.executeSql('SELECT COUNT(*) from tblOrders', [],
				function (transaction, resultSet) {
		   			soapSAPOrderDetails( mobilens.SAMuserStore.first().get('userName'), mobilens.SAMuserStore.first().get('password'),orderNumber);
        		    db.transaction(function(tx)
	        				   {
        		    			getOrderDetail (orderNumber);
	   			   				});
					} // end of order header transaction onSuccess function
			);
		});
}







mobilens.urlTitleBar = new Ext.Toolbar({
        dock: 'top',
        xtype: 'toolbar',
        title: ''
    });

mobilens.urlCloseButton = new Ext.Button({
        text: 'Close',
        handler: function(){
		    mobilens.urlPanel.hide();
	        }
    });

mobilens.urlToolBar = new Ext.Toolbar({
                        dock: 'bottom',
		                xtype: 'toolbar',
		                items: [mobilens.urlCloseButton]
    });

mobilens.urlPanel = new Ext.Panel({
        floating: true,
        centered: true,
        modal: true,
        width: 700,
        height: 650,
        dockedItems: [mobilens.urlTitleBar,mobilens.urlToolBar],
        items: [{html: ''}]
});

function displayTargetURL( srcURL, srcTitle) {
 
    mobilens.deliveryPnl.hide();
    var srcHTML = '&nbsp;&nbsp;&nbsp;<span class="browserOpen"><a href="'+srcURL+'">Open In Browser</a></span><br><br><div style=" overflow:hidden; margin:auto; width:680px; height:495px;""><iframe width="680px" height="495px" src="'+srcURL+'">iFrame Not Supported</iframe>';
    mobilens.urlPanel.items.items[0].html = srcHTML;
    mobilens.urlPanel.show();
}





// Load system state parameters into ShipToStore
function loadSystemState() {

    // Load ShipTo Choices
    mobilens.storeShipToChoices.removeAll();
    
    db.transaction(function(transaction){transaction.executeSql("select recordValue1 from tblSystemState where recordType = 'ShipToFilter'", [],
				function (transaction, resultSet) {
						var returnL = resultSet.rows.length;
						if( returnL > 0 )
							{
								for (var k=0; k<returnL; k++) {
										var row = resultSet.rows.item(k);
                                        mobilens.storeShipToChoices.add({filteredShipTo: row.recordValue1});
										}
							}
					});
    }); // end of the loading system state parameters

    // Load Order Type Choices - no need to RemoveAll b/c we are only going to update records in the list
    db.transaction(function(transaction){transaction.executeSql("select recordStatus, recordValue1 from tblSystemState where recordType = 'orderType'", [],
                function (transaction, resultSet) {
                        var returnL = resultSet.rows.length;
						if( returnL > 0 )
							{
								for (var k=0; k<returnL; k++) {
										var row = resultSet.rows.item(k);
                                        //mobilens.storeOrderTypeChoices.each(function(storeRec){
                                        //
                                        //});
                                        //mobilens.storeShipToChoices.add({filteredShipTo: row.recordValue1});
                                        mobilens.storeOrderTypeChoices.updateStatus(row.recordValue1, row.recordStatus);
										}
							}
					});
    }); // end of the loading system state parameters   
}

function shipToSelectAll() {
                    //mobilens.filterPanel.hide();
                    
                    db.transaction(function(tx){tx.executeSql('SELECT "NOTHING"',[],
                        function(tx,resultsSet){
                    
                            mobilens.shipToList.refreshDisplay('hide');
                            
                            db.transaction(function(tx){tx.executeSql('SELECT "NOTHING"',[],
                               function(tx,resultsSet){
                                    
                                    mobilens.storeSAPShipToCustomers.filter('isSelected','');
                                    mobilens.storeSAPShipToCustomers.each(function(clrRecord){
                                        if( clrRecord.get('isSelected') != '1')
                                        { clrRecord.toggleSelection(); }
                                    });
					                mobilens.storeSAPShipToCustomers.clearFilter();
                    
                                    db.transaction(function(tx){tx.executeSql('SELECT "NOTHING"',[],
                                        function(tx,resultsSet){
                                            mobilens.shipToList.refreshDisplay('show');
                                    },db.onError);});
                                    
                            },db.onError);});
                    },db.onError);});
}


function shipToClearSelection() {
                    
                    db.transaction(function(tx){tx.executeSql("DELETE FROM tblSystemState where recordType = 'ShipToFilter' ",[],
                    function(tx,resultsSet){
                        console.log('System state table cleared.'); 
                    },db.onError);});
                    
                    
                    db.transaction(function(tx){tx.executeSql('SELECT "NOTHING"',[],
                        function(tx,resultsSet){
                    
                            mobilens.shipToList.refreshDisplay('hide');
                            
                            db.transaction(function(tx){tx.executeSql('SELECT "NOTHING"',[],
                               function(tx,resultsSet){
                                    
                                    mobilens.storeSAPShipToCustomers.filter('isSelected','1');
                                    mobilens.storeSAPShipToCustomers.each(function(clrRecord){
                                        if( clrRecord.get('isSelected') === '1')
                                            { clrRecord.set('isSelected', ''); }
                                        });
					                mobilens.storeSAPShipToCustomers.clearFilter();
                    
                                    db.transaction(function(tx){tx.executeSql('SELECT "NOTHING"',[],
                                        function(tx,resultsSet){
                                            mobilens.shipToList.refreshDisplay('show');
                                    },db.onError);});
                                    
                            },db.onError);});
                    },db.onError);});
}




