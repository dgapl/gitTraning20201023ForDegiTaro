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

    const vmMaintenanceElement = document.getElementById('vm_maintenance');
    vmMaintenanceElement.addEventListener(
        'click', () => {
            clickMaintenanceButton();
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

    const vmStopElement = document.getElementById('vm_stop');
    vmStopElement.addEventListener(
        'click', () => {
            clickStopButton();
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
 * 補充ボタンクリックイベント
 */
async function clickMaintenanceButton() {
    if (statusCode === SYSTEM_STATUS_CODE.FAIL) {
        return;
    }
    await returnDeposit();
    statusCode = SYSTEM_STATUS_CODE.MAINTENANCE;
    viewStatus();
    viewItems();
    
    const startButtonElement = document.getElementById('vm_start');
    startButtonElement.classList.remove('in_disable_button');
    startButtonElement.classList.add('in_enable_button');
    
    const stopButtonElement = document.getElementById('vm_stop');
    stopButtonElement.classList.remove('in_disable_button');
    stopButtonElement.classList.add('in_enable_button');
    
    const maintenanceButtonElement = document.getElementById('vm_maintenance');
    maintenanceButtonElement.classList.remove('in_enable_button');
    maintenanceButtonElement.classList.add('in_disable_button');
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
    
    const stopButtonElement = document.getElementById('vm_stop');
    stopButtonElement.classList.remove('in_disable_button');
    stopButtonElement.classList.add('in_enable_button');
    
    const maintenanceButtonElement = document.getElementById('vm_maintenance');
    maintenanceButtonElement.classList.remove('in_disable_button');
    maintenanceButtonElement.classList.add('in_enable_button');
}

/**
 * 販売停止ボタンクリックイベント
 */
async function clickStopButton() {
    if (statusCode === SYSTEM_STATUS_CODE.FAIL) {
        return;
    }
    await returnDeposit();
    statusCode = SYSTEM_STATUS_CODE.STOP;
    viewStatus();
    viewItems();
    
    const startButtonElement = document.getElementById('vm_start');
    startButtonElement.classList.remove('in_disable_button');
    startButtonElement.classList.add('in_enable_button');
    
    const stopButtonElement = document.getElementById('vm_stop');
    stopButtonElement.classList.remove('in_enable_button');
    stopButtonElement.classList.add('in_disable_button');
    
    const maintenanceButtonElement = document.getElementById('vm_maintenance');
    maintenanceButtonElement.classList.remove('in_disable_button');
    maintenanceButtonElement.classList.add('in_enable_button');
}
