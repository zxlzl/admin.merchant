import * as React from 'react'
import { Cascader } from 'antd'

import { CascaderProps, CascaderOptionType } from 'antd/es/cascader'

import { MIDDLEWARE_URL, ajax } from "@/utils/request";

export interface CityPickerProps extends CascaderProps {
}

interface CityPickerState {
  /** 可选项数据源 */
  options: CascaderOptionType[];
  /** 已选择数据 */
  selectedOptions?: CascaderOptionType[];
}

export default class CityPicker extends React.PureComponent<
  CityPickerProps,
  CityPickerState
  > {

  static defaultProps = {
    options: []
  }

  constructor(props: CityPickerProps) {
    super(props)
    this.state = {
      options: [],
    }
  }

  async componentDidMount() {
    const provinces = await this.fetchProvinces()
    this.setState({ options: provinces })
  }

  async componentDidUpdate(prevProps: CityPickerProps) {
    // const { defaultValue: prevDefaultValue } = prevProps
    // const { defaultValue = [] } = this.props

    // if (defaultValue && defaultValue !== prevDefaultValue) {
    //   const [provinceCode, cityCode, districtCode] = defaultValue

    //   const [province] = await Promise.all(
    //     defaultValue.map(async (v, i) => {
    //       if (i === 0) {
    //         const provinces = await this.fetchProvinces()
    //         return provinces
    //       }
    //       const data = await this.fetchRegionByParentId(v)
    //       return data
    //     })
    //   )

    //   // const selectedProvinceIndex = provinces.findIndex((o) => { return o.value === provinceCode })

    //   // if (selectedProvinceIndex != -1) {
    //   //   const cities = await this.fetchRegionByParentId(provinceCode)
    //   //   provinces[selectedProvinceIndex].children = cities


    //   // }
    //   let cities: CascaderOptionType[], districts: CascaderOptionType[]

    //   if (provinceCode) {
    //     cities = (await ajax({
    //       url: `/regionV2/getRegionByParentId`,
    //       type: "POST",
    //       data: {
    //         parentId: provinceCode
    //       },
    //       requestType: 'json',
    //       prefix: MIDDLEWARE_URL
    //     })).data.map((d: any) => {
    //       return {
    //         label: d.regionName,
    //         value: d.regionCode,
    //         id: d.id,
    //         isLeaf: d.childCount == 0,
    //       }
    //     })

    //     if (selectedProvince[0] && !selectedProvince[0].isLeaf) {
    //       selectedProvince[0].children = cities
    //     }
    //   }

    //   if (cityCode) {
    //     districts = (await ajax({
    //       url: `/regionV2/getRegionByParentId`,
    //       type: "POST",
    //       data: {
    //         parentId: cityCode
    //       },
    //       requestType: 'json',
    //       prefix: MIDDLEWARE_URL
    //     })).data.map((d: any) => {
    //       return {
    //         label: d.regionName,
    //         value: d.regionCode,
    //         id: d.id,
    //         isLeaf: d.childCount == 0,
    //       }
    //     })

    //     if (cities) {
    //       const selectedCity = cities.find((o) => { return o.value === provinceCode }) as CascaderOptionType[]
    //     }
    //   }

    //   this.setState({
    //     options: [...this.state.options],
    //   });
    // }
  }


  /**
   * 获取所有省份
   *
   * @author shixin.deng
   * @returns {Promise<CascaderOptionType[]>}
   * @memberof CityPicker
   */
  async fetchProvinces(): Promise<CascaderOptionType[]> {
    const { data = [] } = await ajax({
      url: `/regionV2/getProvince`,
      type: "POST",
      data: {},
      requestType: 'json',
      prefix: MIDDLEWARE_URL
    })

    const province = data.map((d: any) => {
      return { label: d.regionName, value: d.regionCode, id: d.id, isLeaf: d.childCount === 0 }
    })

    return province
  }

  /**
   *
   * 根据父节点id查询
   * @author shixin.deng
   * @param {number} [parentId]
   * @returns {Promise<CascaderOptionType[]>}
   * @memberof CityPicker
   */
  async fetchRegionByParentId(parentId: number | string): Promise<CascaderOptionType[]> {
    const { data = [] } = await ajax({
      url: `/regionV2/getRegionByParentId`,
      type: "POST",
      data: { parentId },
      requestType: 'json',
      prefix: MIDDLEWARE_URL
    })

    const subOptions = data.map((d: any) => {
      return {
        label: d.regionName,
        value: d.regionCode,
        id: d.id,
        isLeaf: d.childCount == 0,
      }
    })

    return subOptions
  }

  /**
    * 动态加载省市区数据
    */
  loadData = async (selectedOptions?: CascaderOptionType[]) => {
    selectedOptions = selectedOptions ? selectedOptions : []
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const subOptions = await this.fetchRegionByParentId(targetOption.id)

    targetOption.loading = false;
    targetOption.children = subOptions.length ? subOptions : undefined

    this.setState({
      options: [...this.state.options],
    });
  };

  /**
   * 选择省市区回调
   */
  onChange = (value: string[], selectedOptions?: CascaderOptionType[]) => {
    const { onChange } = this.props
    this.setState({ selectedOptions })
    if (onChange && typeof onChange === 'function') {
      onChange(value, selectedOptions)
    }
  };

  get value() {
    return this.state.selectedOptions
  }

  render() {
    return <Cascader options={this.state.options} onChange={this.onChange} loadData={this.loadData} placeholder={this.props.placeholder || '请选择所在地区'} />
  }
}