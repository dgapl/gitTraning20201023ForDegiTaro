/**
 * ステータスコード
 */
let statusCode = SYSTEM_STATUS_CODE.STOP;

/**
 * 投入金額
 */
let deposit = 0;

/**
 * 所持金投入ボタンの活性制御（初期値は活性）
 */
let isEnableForInButton = true;

/**
 * 釣銭返金ボタンの活性制御（初期値は非活性）
 */
let isEnableForReturnButton = false;

/**
 * ウィンドウ読み込み時の処理
 */
window.onload = () => {
    initializeVendingMachine();
    eventVendingMachine();
    viewVendingMachine();
}
