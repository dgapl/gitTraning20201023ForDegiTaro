/**
 * 自販機イベント
 */
function eventVendingMachine() {
    for (let moneyNumber in money) {
        const coinInButtonElement = document.getElementById('in_' + moneyNumber);
        coinInButtonElement.addEventListener(
            'click', () => {
                clickCoinInButton(moneyNumber);
            },
            false
        );
    }

    const coinReturnButtonElement = document.getElementById('coin_return');
    coinReturnButtonElement.addEventListener(
        'click', () => {
            clickCoinReturnButton();
        },
        false
    );

    const vmStartElement = document.getElementById('vm_start');
    vmStartElement.addEventListener(
        'click', () => {
            clickStartButton();
        },
        false
    );
    
    const returnCollectionElement = document.getElementById('return_collection');
    returnCollectionElement.addEventListener(
        'click', () => {
            returnCollection();
            viewVendingMachine();
        },
        false
    );
}

/**
 * 所持金投入ボタンクリックイベント
 * @param {number} moneyNumber 投入金額
 */
function clickCoinInButton(moneyNumber) {
    useMoney(moneyNumber);
}

/**
 * おつり返却ボタンクリックイベント
 */
async function clickCoinReturnButton() {
    await returnDeposit();
}

/**
 * 販売開始ボタンクリックイベント
 */
function clickStartButton() {
    if (statusCode === SYSTEM_STATUS_CODE.FAIL) {
        return;
    }
    statusCode = SYSTEM_STATUS_CODE.BUY;
    viewStatus();
    viewItems();
    
    const startButtonElement = document.getElementById('vm_start');
    startButtonElement.classList.remove('in_enable_button');
    startButtonElement.classList.add('in_disable_button');
}
