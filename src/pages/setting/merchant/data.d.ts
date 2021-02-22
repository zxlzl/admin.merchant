export interface BaseData {
  /** 商户类型 */
  merchantType: number;
  /** 归属服务商 */
  belongMerchant: number;
  /** 营业执照影像件url */
  licenseUrl: string;
  /** 商户简称 */
  merchantAbbr: string;
  /** 商户全称 */
  merchantName: string;
  /** 纳税人类型 01：一般纳税人，02：小规模纳税人 */
  taxRate: number;
  /** 注册地址 */
  registeredAddress: string;
  /** 营业执照注册号 */
  registrationNumber: string;
  /** 营业地址 */
  businessAddress: string;
  paccountNo?: string;
  vatRate?: number;
  feeRate?: number;
  taxpayerType?: string;
  collectedSubjectNo?: string;
  id?: number;
  merchantNo?: string;
  status?: string;
  qualificationUrl?:string
}

export interface ContactData {
  province: string;
  provinceCode: string;
  city: string;
  cityCode: string;
  district: string;
  districtCode: string;
  detailAddr: string;
  name: string;
  phone: string;
  email: string;
  merchantNo: string;
  id: number;
  status: string;
}

export interface SettleData {
  /**
   * bank_account_name，银行户名
   */
  bankAccountName: string;

  /**
   * bank_code，开户银行编码
   */
  bankCode: string;

  /**
   * gmt_modified，更新时间
   */
  gmtModified: string;

  /**
   * bank_account_no，银行账号
   */
  bankAccountNo: string;

  /**
   * branch_name，开户支行名称
   */
  branchName: string;

  /**
   * bank_name，开户银行名称
   */
  bankName: string;

  /**
   * id
   */
  id: number;

  /**
   * gmt_create，添加时间
   */
  gmtCreate: string;

  /**
   * operator_add，添加人
   */
  operatorAdd: number;

  /**
   * operator_modified，更新人
   */
  operatorModified: number;

  /**
   * merchant_no，商户号
   */
  merchantNo: string;
}

export interface InvoiceData {
  /**
   * become_taxpayer_date，成为一般纳税人时间
   */
  becomeTaxpayerDate: string;

  /**
   * gmt_modified，操作时间
   */
  gmtModified: string;

  /**
   * service_charge_invoicing，服务费开票方式,01:手动申请开票，02:自动按月开票
   */
  serviceChargeInvoicing: string;

  /**
   * bank_account_no，银行账号
   */
  bankAccountNo: string;

  /**
   * bank_name，开户银行
   */
  bankName: string;

  /**
   * operator_add，添加人
   */
  operatorAdd: number;

  /**
   * operator_modified，操作人
   */
  operatorModified: number;

  /**
   * receiver_area_province，收件人所在地区省
   */
  receiverAreaProvince: string;

  /**
   * receiver_phone，收件人联系电话
   */
  receiverPhone: string;

  /**
   * taxpayer_type，纳税人主体类型，01:一般增值税纳税人，02:小规模增值税纳税人
   */
  taxpayerType: string;

  /**
   * invoice_printing_phone，发票打印电话
   */
  invoicePrintingPhone: string;

  /**
   * taxpayer_regist_no，纳税人识别号
   */
  taxpayerRegistNo: string;

  /**
   * invoice_type，开票类型，01:增值税专用发票，02:增值税普通发票
   */
  invoiceType: string;

  /**
   * id
   */
  id: number;

  /**
   * busi_license_regist_addr，营业执照注册地址
   */
  busiLicenseRegistAddr: string;

  /**
   * invoice_title，发票抬头
   */
  invoiceTitle: string;

  /**
   * receiver_area_city，收件人所在地区市
   */
  receiverAreaCity: string;

  /**
   * receiver_name，收件人姓名
   */
  receiverName: string;

  /**
   * tax_regist_cert，税务登记证url
   */
  taxRegistCert: string;

  /**
   * receiver_detail_address，收件人详细地址
   */
  receiverDetailAddress: string;

  /**
   * gmt_create，添加时间
   */
  gmtCreate: string;

  /**
   * invoice_medium，发票介质，01:纸质发票，02:电子发票
   */
  invoiceMedium: string;

  /**
   * other_qualificate_cert，其他资质证明url
   */
  otherQualificateCert: string;

  /**
   * receiver_area_district，收件人所在地区区
   */
  receiverAreaDistrict: string;

  /**
   * merchant_no，商户号
   */
  merchantNo: string;
}
