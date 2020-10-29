/**
 * 自販機を表示する
 */
function viewVendingMachine() {
    viewMoney();
    viewReturnSlot();
    viewDeposit();
    viewProceeds();
    viewItems();
    viewStatus();
}

/**
 * 商品を表示する
 */
function viewItems() {
    const itemsSpaceElement = document.getElementById('items_space');
    itemsSpaceElement.innerHTML = '';
    for (let rowNumber in itemRows) {
        const rows = itemRows[rowNumber];
        const rowsElement = document.createElement('div');
        rowsElement.classList.add('flexline');
        for (let items of rows.items) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');

            addItemImageElement(itemElement, items);
            addItemHotColdElement(itemElement, items);
            addItemBuyElement(itemElement, rowNumber, items);
            addClickEventForItem(itemElement, rowNumber, items);

            rowsElement.append(itemElement);
        }
        itemsSpaceElement.append(rowsElement);
    }
}

/**
 * 商品イメージエレメントを追加する
 * @param {HTTPElement} itemElement 商品のHTTPエレメント
 * @param {object} item 商品オブジェクト
 */
function addItemImageElement(itemElement, item) {
    const itemImageElement = document.createElement('div');
    itemImageElement.classList.add('item_image');
    itemImageElement.innerText = item.name;
    itemElement.append(itemImageElement);
}

/**
 * 商品温度エレメントを追加する
 * @param {HTTPElement} itemElement 商品のHTTPエレメント
 * @param {object} item 商品オブジェクト
 */
function addItemHotColdElement(itemElement, item) {
    const itemHotColdElement = document.createElement('div');
    if (item.isHot) {
        itemHotColdElement.classList.add('item_hot');
        itemHotColdElement.innerText = TEMPERATURE_MESSAGE.HOT;
    } else {
        itemHotColdElement.classList.add('item_cold');
        itemHotColdElement.innerText = TEMPERATURE_MESSAGE.COLD;
    }
    itemElement.append(itemHotColdElement);
}

/**
 * 商品購入エレメントを追加する
 * @param {HTTPElement} itemElement 商品のHTTPエレメント
 * @param {number} rowNumber 商品の棚番号
 * @param {object} item 商品オブジェクト
 */
function addItemBuyElement(itemElement, rowNumber, item) {
    const itemBuyElement = document.createElement('div');
    itemBuyElement.classList.add('item_buy_button');
    if (statusCode === SYSTEM_STATUS_CODE.MAINTENANCE) {
        itemBuyElement.classList.add('item_stock');
        const upStockElement  = document.createElement('a');
        upStockElement.innerText = '▲';
        addClickEventForUpStock(upStockElement, rowNumber, item);

        const downStockElement  = document.createElement('a');
        downStockElement.innerText = '▼';
        addClickEventForDownStock(downStockElement, rowNumber, item);

        const viewStockElement  = document.createElement('span');
        viewStockElement.innerText = '残: ' + item.stock + ' 本';
        
        itemBuyElement.append(upStockElement);
        itemBuyElement.append(viewStockElement);
        itemBuyElement.append(downStockElement);
    }else{
        if (isSoldout(item)) {
            itemBuyElement.classList.add('item_soldout');
        } else if (isItemBuy(item)) {
            itemBuyElement.classList.add('item_buy_start');
        } else {
            itemBuyElement.classList.add('item_buy_stop');
        }

        if (isSoldout(item)) {
            itemBuyElement.innerText = SYSTEM_MESSAGE.SOLDOUT;
        } else {
            itemBuyElement.innerText = item.price + ' 円';
        }
    }
    itemElement.append(itemBuyElement);
}

/**
 * 商品在庫加算クリックイベント
 * @param {HTTPElement} itemElement 商品のHTTPエレメント
 * @param {number} rowNumber 商品の棚番号
 * @param {object} item 商品オブジェクト
 */
function addClickEventForUpStock(itemElement, rowNumber, item) {
    itemElement.addEventListener(
        'click',
        () => {
            upItemStock(rowNumber, item.id);
            viewItems();
        },
        false
    );
}

/**
 * 商品在庫減少クリックイベント
 * @param {HTTPElement} itemElement 商品のHTTPエレメント
 * @param {number} rowNumber 商品の棚番号
 * @param {object} item 商品オブジェクト
 */
function addClickEventForDownStock(itemElement, rowNumber, item) {
    itemElement.addEventListener(
        'click',
        () => {
            downItemStock(rowNumber, item.id);
            viewItems();
        },
        false
    );
}

/**
 * 商品クリックイベント
 * @param {HTTPElement} itemElement 商品のHTTPエレメント
 * @param {number} rowNumber 商品の棚番号
 * @param {object} item 商品オブジェクト
 */
function addClickEventForItem(itemElement, rowNumber, item) {
    itemElement.addEventListener(
        'click',
        () => {
            if (isItemBuy(item)) {
                buyItem(rowNumber, item.id);
            }
        },
        false
    );
}

/**
 * 所持金を表示する
 */
function viewMoney() {
    for (let moneyNumber in money) {
        const moneyElement = document.getElementById('money_' + moneyNumber);
        moneyElement.innerText = money[moneyNumber];
    }
}

/**
 * 返金スロットを表示する
 */
function viewReturnSlot() {
    for (let returnSlotNumber in returnSlot) {
        const returnSlotElement = document.getElementById('return_slot_' + returnSlotNumber);
        returnSlotElement.innerText = returnSlot[returnSlotNumber];
    }
}

/**
 * 投入金額を表示する
 */
function viewDeposit() {
    const depositElement = document.getElementById('deposit');
    if (deposit > 0) {
        depositElement.innerText = deposit + '円';
        return;
    }
    depositElement.innerText = '.';
}

/**
 * 売上を表示する
 */
function viewProceeds() {
    const proceedsElement = document.getElementById('proceeds');
    proceedsElement.innerText = proceeds + '円';
}

/**
 * ステータスを表示する
 */
function viewStatus() {
    const statusElement = document.getElementById('vm_status');
    let statusMessage;
    switch (statusCode) {
        case SYSTEM_STATUS_CODE.STOP:
            statusMessage = SYSTEM_MESSAGE.STOP;
            break;
        case SYSTEM_STATUS_CODE.BUY:
            statusMessage = SYSTEM_MESSAGE.BUY;
            break;
        case SYSTEM_STATUS_CODE.MAINTENANCE:
            statusMessage = SYSTEM_MESSAGE.MAINTENANCE;
            break;
        default:
            statusMessage = SYSTEM_MESSAGE.FAIL;
            break;
    }
    statusElement.innerText = statusMessage;
}

/**
 * 釣銭切れを通知する
 */
async function viewUseCorrectChange() {
    const statusElement = document.getElementById('vm_status');
    statusElement.innerText = '釣銭切れ';
    await delayMillisec(3000);
    viewStatus();
}

/**
 * 返金ボタンを活性にする
 */
function enableReturnButton() {
    const coinReturnButtonElement = document.getElementById('coin_return');
    coinReturnButtonElement.classList.remove('coin_return_disable_button');
    coinReturnButtonElement.classList.add('coin_return_enable_button');
    isEnableForReturnButton = true;
}


/**
 * 返金ボタンを非活性にする
 */
function disableReturnButton() {
    const coinReturnButtonElement = document.getElementById('coin_return');
    coinReturnButtonElement.classList.remove('coin_return_enable_button');
    coinReturnButtonElement.classList.add('coin_return_disable_button');
    isEnableForReturnButton = false;
}

/**
 * 所持金投入ボタンを活性にする
 */
function enableInButton() {
    for (let moneyNumber in money) {
        if (money[moneyNumber] > 0) {
            const inButtonElement = document.getElementById('in_' + moneyNumber);
            inButtonElement.classList.remove('in_disable_button');
            inButtonElement.classList.add('in_enable_button');
        }
    }
    isEnableForInButton = true;
}

/**
 * 所持金投入ボタンを非活性にする
 */
function disableInButton() {
    for (let moneyNumber in money) {
        const inButtonElement = document.getElementById('in_' + moneyNumber);
        inButtonElement.classList.remove('in_enable_button');
        inButtonElement.classList.add('in_disable_button');
    }
    isEnableForInButton = false;
}

/**
 * ページタイトルを表示する
 */
function viewPageTitle() {
    document.title = VENDING_MACHINE_NAME + ' - ' + VENDING_MACHINE_VERSION;
}

/**
 * フッターを表示する
 */
function viewFooter() {
    const footerElement = document.getElementById('footer');
    footerElement.innerText = VENDING_MACHINE_NAME + ' - ' + VENDING_MACHINE_VERSION;
}
