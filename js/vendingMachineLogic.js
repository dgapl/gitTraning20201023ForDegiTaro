/**
 * 初期化処理
 */
function initializeVendingMachine() {
    viewPageTitle();
    viewFooter();

    itemRows.length = 0;
    for (let rows of getItemRows()) {
        itemRows.push(rows);
    }

    const defaultMoney = getMoney().money;
    for (let moneyNumber in defaultMoney) {
        money[moneyNumber] = defaultMoney[moneyNumber];
    }

    const defaultChange = getVmSetting().change;
    for (let changeNumber in defaultChange) {
        change[changeNumber] = defaultMoney[changeNumber];
    }
}

/**
 * 対象商品が売り切れか判別する
 * @param {object} item 商品オブジェクト
 */
function isSoldout(item) {
    if (item.stock === 0) {
        return true;
    }
    return false;
}

/**
 * 対象商品が購入可能か判別する
 * @param {object} item 商品オブジェクト
 */
function isItemBuy(item) {
    if (item.stock > 0 && item.price <= deposit) {
        return true;
    }
    return false;
}

/**
 * 対象商品を購入する
 * @param {number} rowNumber 商品の棚番号
 * @param {number} itemId 商品ID
 */
async function buyItem(rowNumber, itemId) {
    const idx = itemRows[rowNumber].items.findIndex((item) => {
        return item.id === itemId;
    });
    const buyPrice = Number(itemRows[rowNumber].items[idx].price);
    if (!isReturnChange(buyPrice)) {
        console.error('USE CORRECT CHANGE');
        viewUseCorrectChange();
        return;
    }
    itemRows[rowNumber].items[idx].stock -= 1;
    deposit -= buyPrice;
    proceeds += buyPrice;
    addHstory(itemRows[rowNumber].items[idx]);
    viewDeposit();
    viewProceeds();
    viewItems();
    await returnDeposit();
}

/**
 * 所持金を使用する
 * @param {number} moneyNumber 使用金額
 */
async function useMoney(moneyNumber) {
    if (!isEnableForInButton || money[moneyNumber] === 0) {
        return;
    }
    disableInButton();
    money[moneyNumber] -= 1;
    viewMoney();
    if (statusCode !== SYSTEM_STATUS_CODE.BUY) {
        await addDeposit(moneyNumber);
        await returnDeposit();
        return;
    }
    addChange(moneyNumber);
    await addDeposit(moneyNumber);
    enableInButton();
    viewItems();
}

/**
 * 返金スロットに返金する
 * @param {number} returnSlotNumber 返金額
 */
function addReturnSlot(returnSlotNumber) {
    returnSlot[returnSlotNumber] += 1;
    viewReturnSlot();
}

/**
 * お金を投入する
 * @param {number} moneyNumber 投入金額
 */
async function addDeposit(moneyNumber) {
        await delayMillisec(DEPOSIT_DELAY_MILLISEC);
    deposit += Number(moneyNumber);
    viewDeposit();
    enableReturnButton();
}

/**
 * 返金する
 */
async function returnDeposit() {
    try {
        if (!isEnableForReturnButton) {
            return;
        }
        disableReturnButton();
        disableInButton();
        while (deposit > 0) {
            if (statusCode === SYSTEM_STATUS_CODE.BUY) {
                await delayMillisec(DEPOSIT_DELAY_MILLISEC);
            }
            returnChange();
            viewDeposit();
            viewItems();
        }
    } catch (err) {
        statusCode = SYSTEM_STATUS_CODE.FAIL;
        viewStatus();
        console.error(err);
        console.error('change deposit: ', deposit);
    }
    enableInButton();
}

/**
 * 自販機内の釣銭を加算する
 * @param {number} changeNumber 加算対象の釣銭
 */
function addChange(changeNumber) {
    change[changeNumber] += 1;
}

/**
 * 購入後に釣銭が足りているかを確認
 * @param {number} buyPrice 購入金額
 * @return {boolean} 足りている場合はtrue, 足りていない場合はfalse
 */
function isReturnChange(buyPrice) {
    const changeWork = Object.assign({}, change);
    const changeKey = Object.keys(changeWork);
    changeKey.sort((a, b) => { return (Number(a) < Number(b) ? 1 : -1); });

    let depositWork = deposit - buyPrice;
    while (depositWork > 0) {
        let isMatch = false;
        for (let changeNumber of changeKey) {
            if (changeWork[changeNumber] > 0 && depositWork >= changeNumber) {
                depositWork -= Number(changeNumber);
                changeWork[changeNumber] -= 1;
                isMatch = true;
                break;
            }
        }
        if (!isMatch) {
            return false;
        }
    }
    return true;
}

/**
 * 釣銭を返却する
 */
function returnChange() {
    const changeKey = Object.keys(change);
    changeKey.sort((a, b) => { return (Number(a) < Number(b) ? 1 : -1); });
    for (let changeNumber of changeKey) {
        if (change[changeNumber] > 0 && deposit >= changeNumber) {
            deposit -= Number(changeNumber);
            change[changeNumber] -= 1;
            addReturnSlot(changeNumber);
            return;
        }
    }
    throw new Error('change mismatch error!!');
}

/**
 * 指定時間待機後にPromiseを返す
 * @param {number} millisec 待機するミリ秒
 * @return {Promise} 指定時間後にPromiseが返却される
 */
async function delayMillisec(millisec) {
    return new Promise(resolve => setTimeout(resolve, millisec));
}

/**
 * 売上を計上する
 */
function returnCollection () {
    for (let moneyNumber in money) {
        money[moneyNumber] += returnSlot[moneyNumber];
        returnSlot[moneyNumber] = 0;
    }
}

/**
 * 商品の購入履歴を追加する
 * @param {object} item 商品オブジェクト 
 */
function addHstory(item) {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML += '<div>[ ' + item.price + '円 ]: ' + item.name + '</div>\n';
}
