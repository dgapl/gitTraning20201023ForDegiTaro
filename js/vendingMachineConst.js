/**
 * 所持金管理オブジェクト
 */
const money = {
    5000: 0,
    1000: 0,
    500: 0,
    100: 0,
    50: 0,
    10: 0
};

/**
 * 釣銭管理オブジェクト
 */
const change = {
    5000: 0,
    1000: 0,
    500: 0,
    100: 0,
    50: 0,
    10: 0
};

/**
 * 返金スロット管理オブジェクト
 */
const returnSlot = {
    5000: 0,
    1000: 0,
    500: 0,
    100: 0,
    50: 0,
    10: 0
};

/**
 * システムステータスコード
 */
const SYSTEM_STATUS_CODE = {
    STOP: 0,
    BUY: 1,
    MAINTENANCE: 2,
    FAIL: 99
};

/**
 * システムメッセージ
 */
const SYSTEM_MESSAGE = {
    FAIL: '故障中',
    BUY: '販売中',
    MAINTENANCE: '補充中',
    STOP: '停止中',
    SOLDOUT: '売り切れ'
};

/**
 * 商品温度メッセージ
 */
const TEMPERATURE_MESSAGE = {
    COLD: 'つめたい',
    HOT: 'あたたかい'
};

/**
 * 投入金額反映遅延時間（ms）
 */
const DEPOSIT_DELAY_MILLISEC = 500;

/**
 * システム名
 */
VENDING_MACHINE_NAME = '自販機シミュレータ';

/**
 * システムバージョン
 */
VENDING_MACHINE_VERSION = 'v1.2.0';

/**
 * 商品情報管理配列
 */
const itemRows = [];
