import { Params } from "next/dist/server/request/params";
import { API, handleError } from "./APIutils";

export const salesmanLoadHeaderList = async (params: Params) => {
  try {
    const res = await API.get("/api/agent_transaction/load/list", { params });
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const salesmanLoadHeaderAdd = async (body: object) => {
  try {
    const res = await API.post(`/api/agent_transaction/load/add`, body);
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const salesmanLoadHeaderById = async (uuid: string, params: object) => {
  try {
    const res = await API.get(`/api/agent_transaction/load/${uuid}`, { params });
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const salesmanLoadHeaderUpdate = async (uuid: string, body: object) => {
  try {
    const res = await API.put(`/api/agent_transaction/load/update/${uuid}`, body);
    return res.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const AllDropdownListDataProvider = ({ children }: { children: ReactNode }) => {
  // define typed state for each dropdown list
  const [companyListData, setCompanyListData] = useState<CompanyItem[]>([]);
  const [countryListData, setCountryListData] = useState<CountryItem[]>([]);
  const [regionListData, setRegionListData] = useState<RegionItem[]>([]);
  const [surveyListData, setSurveyListData] = useState<SurveyItem[]>([]);
  const [routeListData, setRouteListData] = useState<RouteItem[]>([]);
  const [routeListBySalesman, setRouteListBySalesman] = useState<RouteItem[]>([]);
  const [warehouseListData, setWarehouseListData] = useState<WarehouseItem[]>([]);
  const [routeTypeData, setRouteTypeData] = useState<RouteTypeItem[]>([]);
  const [areaListData, setAreaListData] = useState<AreaItem[]>([]);
  const [companyCustomersData, setCompanyCustomersData] = useState<CustomerItem[]>([]);
  const [companyCustomersTypeData, setCompanyCustomersTypeData] = useState<CustomerTypeItem[]>([]);
  const [itemCategoryData, setItemCategoryData] = useState<ItemCategoryItem[]>([]);
  const [itemSubCategoryData, setItemSubCategoryData] = useState<ItemSubCategoryItem[]>([]);
  const [channelListData, setChannelListData] = useState<ChannelItem[]>([]);
  const [customerTypeData, setCustomerTypeData] = useState<CustomerType[]>([]);
  const [userTypesData, setUserTypesData] = useState<UserTypeItem[]>([]);
  const [salesmanTypesData, setSalesmanTypesData] = useState<SalesmanType[]>([]);
  const [VehicleList, setVehicleList] = useState<VehicleListItem[]>([]);
  const [customerCategory, setCustomerCategory] = useState<VehicleListItem[]>([]);
  const [customerSubCategory, setCustomerSubCategory] = useState<VehicleListItem[]>([]);
  const [discountType, setDiscountType] = useState<DiscountType[]>([]);
  const [item, setItem] = useState<Item[]>([]);
  const [menuList, setMenuList] = useState<MenuList[]>([]);
  const [salesman, setSalesman] = useState<SalesmanList[]>([]);
  const [agentCustomer, setAgentCustomer] = useState<AgentCustomerList[]>([]);
  const [shelves, setShelves] = useState<ShelvesList[]>([]);
  const [vendor, setVendor] = useState<VendorList[]>([]);
  const [submenu, setSubmenu] = useState<submenuList[]>([]);
  const [permissions, setPermissions] = useState<permissionsList[]>([]);
  const [labels, setLabels] = useState<LabelItem[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [project, setProject] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  // mapped dropdown options (explicit typed mappings)
  const companyOptions = (Array.isArray(companyListData) ? companyListData : []).map((c: CompanyItem) => ({
    value: String(c.id ?? ''),
    label: c.company_code && c.company_name ? `${c.company_code} - ${c.company_name}` : (c.company_name ?? '')
  }));

  const countryOptions = (Array.isArray(countryListData) ? countryListData : []).map((c: CountryItem) => ({
    value: String(c.id ?? ''),
    label: c.country_code && c.country_name ? `${c.country_code} - ${c.country_name}` : (c.country_name ?? '')
  }));
  const onlyCountryOptions = (Array.isArray(countryListData) ? countryListData : []).map((c: CountryItem) => ({
    value: String(c.id ?? ''),
    label: c.country_name ? `${c.country_name}` : (c.country_name ?? '')
  }));

  const countryCurrency = (Array.isArray(countryListData) ? countryListData : []).map((c: CountryItem) => ({
    value: String(c.currency ?? ''),
    label: c.currency ? `${c.currency}` : (c.currency ?? '')
  }));

  const regionOptions = (Array.isArray(regionListData) ? regionListData : []).map((c: RegionItem) => ({
    value: String(c.id ?? ''),
    label: c.region_code && c.region_name ? `${c.region_code} - ${c.region_name}` : (c.region_name ?? '')
  }));
  const surveyOptions = (Array.isArray(surveyListData) ? surveyListData : []).map((c: SurveyItem) => ({
    value: String(c.id ?? ''),
    label: c.survey_code && c.survey_name ? `${c.survey_code} - ${c.survey_name}` : (c.survey_name ?? '')
  }));

  const routeOptions = (Array.isArray(routeListData) ? routeListData : []).map((c: RouteItem) => ({
    value: String(c.id ?? ''),
    label: c.route_code && c.route_name ? `${c.route_code} - ${c.route_name}` : (c.route_name ?? '')
  }));
  const routeOptionsBySalesman = (Array.isArray(routeListBySalesman) ? routeListBySalesman : []).map((c: RouteItem) => ({
    value: String(c.id ?? ''),
    label: c.route_code && c.route_name ? `${c.route_code} - ${c.route_name}` : (c.route_name ?? '')
  }));

  const warehouseOptions = (Array.isArray(warehouseListData) ? warehouseListData : []).map((c: WarehouseItem) => ({
    value: String(c.id ?? ''),
    label: c.warehouse_code && c.warehouse_name ? `${c.warehouse_code} - ${c.warehouse_name}` : (c.warehouse_name ?? '')
  }));

  const routeTypeOptions = (Array.isArray(routeTypeData) ? routeTypeData : []).map((c: RouteTypeItem) => ({
    value: String(c.id ?? ''),
    label: c.route_type_code && c.route_type_name ? `${c.route_type_code} - ${c.route_type_name}` : (c.route_type_name ?? '')
  }));

  const areaOptions = (Array.isArray(areaListData) ? areaListData : []).map((c: AreaItem) => ({
    value: String(c.id ?? ''),
    label: c.area_code && c.area_name ? `${c.area_code} - ${c.area_name}` : (c.area_name ?? ''),
    region_id: Number(c.region_id ?? '')
  }));

  const companyCustomersOptions = (Array.isArray(companyCustomersData) ? companyCustomersData : []).map((c: CustomerItem) => ({
    value: String(c.id ?? ''),
    label: c.customer_code && c.business_name ? `${c.customer_code} - ${c.business_name}` : (c.business_name ?? '')
  }));

  const companyCustomersTypeOptions = (Array.isArray(companyCustomersTypeData) ? companyCustomersTypeData : []).map((c: CustomerTypeItem) => ({
    value: String(c.id ?? ''),
    label: c.code && c.name ? `${c.code} - ${c.name}` : (c.name ?? '')
  }));

  const itemCategoryOptions = (Array.isArray(itemCategoryData) ? itemCategoryData : []).map((c: ItemCategoryItem) => ({
    value: String(c.id ?? ''),
    label: c.category_code && c.category_name ? `${c.category_code} - ${c.category_name}` : (c.category_name ?? '')
  }));

  const itemSubCategoryOptions = (Array.isArray(itemSubCategoryData) ? itemSubCategoryData : []).map((c: ItemSubCategoryItem) => ({
    value: String(c.id ?? ''),
    label: c.sub_category_code && c.sub_category_name ? `${c.sub_category_code} - ${c.sub_category_name}` : (c.sub_category_name ?? '')
  }));

  const channelOptions = (Array.isArray(channelListData) ? channelListData : []).map((c: ChannelItem) => ({
    value: String(c.id ?? ''),
    label: c.outlet_channel_code && c.outlet_channel ? `${c.outlet_channel_code} - ${c.outlet_channel}` : (c.outlet_channel ?? '')
  }));
  const customerTypeOptions = (Array.isArray(customerTypeData) ? customerTypeData : []).map((c: CustomerType) => ({
    value: String(c.id ?? ''),
    label: c.code && c.name ? `${c.code} - ${c.name}` : (c.name ?? '')
  }));

  const userTypeOptions = (Array.isArray(userTypesData) ? userTypesData : []).map((c: UserTypeItem) => ({
    value: String(c.id ?? ''),
    label: c.code && c.name ? `${c.code} - ${c.name}` : (c.name ?? '')
  }));

  const salesmanTypeOptions = (Array.isArray(salesmanTypesData) ? salesmanTypesData : []).map((c: SalesmanType) => ({
    value: String(c.id ?? ''),
    label: c.salesman_type_code && c.salesman_type_name ? `${c.salesman_type_code} - ${c.salesman_type_name}` : (c.salesman_type_name ?? '')
  }));

  const vehicleListOptions = (Array.isArray(VehicleList) ? VehicleList : []).map((c: VehicleListItem) => ({
    value: String(c.id ?? ''),
    label: c.vehicle_code ? c.vehicle_code : '-',
  }));

  const customerCategoryOptions = (Array.isArray(customerCategory) ? customerCategory : []).map((c: CustomerCategory) => ({
    value: String(c.id ?? ''),
    label: c.customer_category_code && c.customer_category_name ? `${c.customer_category_code} - ${c.customer_category_name}` : (c.customer_category_name ?? '')
  }));

  const customerSubCategoryOptions = (Array.isArray(customerSubCategory) ? customerSubCategory : []).map((c: CustomerSubCategory) => ({
    value: String(c.id ?? ''),
    label: c.customer_sub_category_code && c.customer_sub_category_name ? `${c.customer_sub_category_code} - ${c.customer_sub_category_name}` : (c.customer_sub_category_name ?? '')
  }));

  const projectOptions = (Array.isArray(project) ? project : []).map((c: Project) => ({
    value: String(c.id ?? ''),
    label: c.osa_code && c.name ? `${c.osa_code} - ${c.name}` : (c.name ?? '')
  }))
  console.log(projectOptions)

  const itemOptions = (Array.isArray(item) ? item : []).map((c: Item) => ({
  value: String(c.id ?? ""),
  label:
    c.item_code && c.name
      ? `${c.item_code} - ${c.name}`
      : c.name ?? "",
  uom: Array.isArray((c as any).uom)
    ? (c as any).uom.map((u: any) => ({
        id: Number(u.id ?? 0),
        name: String(u.name ?? ""),
        uom_type: String(u.uom_type ?? ""),
        price: Number(u.price ?? 0),
        upc: String(u.upc ?? ""),
      }))
    : [],
}));


  const getItemUoms = (item_id: string | number) => {
    const idStr = String(item_id ?? '');
    const found = item.find(it => String(it.id ?? '') === idStr);
    if (!found) return [];
    return (Array.isArray(found.uom) ? found.uom : []).map(u => ({
      id: String(u.id ?? ''),
      name: String(u.name ?? ''),
      uom_type: String(u.uom_type ?? ''),
      price: String(u.price ?? ''),
      upc: String(u.upc ?? ''),
    }));
  };

  const getPrimaryUom = (item_id: string | number) => {
    const uoms = getItemUoms(item_id);
    if (!uoms || uoms.length === 0) return null;
    // prefer uom_type === 'primary', otherwise return first
    const primary = uoms.find(u => (u.uom_type || '').toLowerCase() === 'primary');
    return primary ?? uoms[0];
  };

  const discountTypeOptions = (Array.isArray(discountType) ? discountType : []).map((c: DiscountType) => ({
    value: String(c.id ?? ''),
    label: c.discount_code && c.discount_name ? `${c.discount_code} - ${c.discount_name}` : (c.discount_name ?? '')
  }));

  const menuOptions = (Array.isArray(menuList) ? menuList : []).map((c: MenuList) => ({
    value: String(c.id ?? ''),
    label: c.osa_code && c.name ? `${c.osa_code} - ${c.name}` : (c.name ?? '')
  }));

  const vendorOptions = (Array.isArray(vendor) ? vendor : []).map((c: VendorList) => ({
    value: String(c.id ?? ''),
    label: c.code && c.name ? `${c.code} - ${c.name}` : (c.name ?? '')
  }));

  const salesmanOptions = (Array.isArray(salesman) ? salesman : []).map((c: SalesmanList) => ({
    value: String(c.id ?? ''),
    label: c.osa_code && c.name ? `${c.osa_code} - ${c.name}` : (c.name ?? '')
  }));

  const agentCustomerOptions = (Array.isArray(agentCustomer) ? agentCustomer : []).map((c: AgentCustomerList) => ({
    value: String(c.id ?? ''),
    label: c.osa_code && c.outlet_name ? `${c.osa_code} - ${c.outlet_name}` : (c.outlet_name ?? ''),
    contact_no: c.contact_no ?? ''
  }));

  const shelvesOptions = (Array.isArray(shelves) ? shelves : []).map((c: ShelvesList) => ({
    value: String(c.id ?? ''),
    label: c.shelf_name ?? ''
  }));

  const submenuOptions = (Array.isArray(submenu) ? submenu : []).map((c: submenuList) => ({
    value: String(c.id ?? ''),
    label: c.name ?? ''
  }));

  const permissionsOptions = (Array.isArray(permissions) ? permissions : []).map((c: permissionsList) => ({
    value: String(c.id ?? ''),
    label: c.name ?? '',
    guard_name: c.guard_name ?? ''
  }));

  const labelOptions = (Array.isArray(labels) ? labels : []).map((c: LabelItem) => ({
    value: String(c.id ?? ''),
    label: c.osa_code && c.name ? `${c.osa_code} - ${c.name}` : (c.name ?? '')
  }));
  const roleOptions = (Array.isArray(roles) ? roles : []).map((r: Role) => ({
    value: String(r.id ?? ''),
    label: r.name ?? ''
  }));


    // Keep loading false here to avoid flipping global loading unexpectedly; caller may manage UI.
  
    const fetchAreaOptions = useCallback(async (region_id: string | number) => {

    setLoading(false);
    try {
      // call subRegionList with an object matching the expected Params shape
      const res = await subRegionList({ region_id: String(region_id),dropdown:"true"  });
      const normalize = (r: unknown): AreaItem[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as AreaItem[];
        }
        if (Array.isArray(r)) return r as AreaItem[];
        return [];
      };
      setAreaListData(normalize(res));
    } catch (error) {
      setAreaListData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCustomerCategoryOptions = useCallback(async (outlet_channel_id: string | number) => {
    // Keep loading false here to avoid flipping global loading unexpectedly; caller may manage UI.
    setLoading(false);
    try {
      // call customerCategoryList with channel_id
      const res = await customerCategoryList({ outlet_channel_id: String(outlet_channel_id) });
      const normalize = (r: unknown): CustomerCategory[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as CustomerCategory[];
        }
        if (Array.isArray(r)) return r as CustomerCategory[];
        return [];
      };
      setCustomerCategory(normalize(res));
    } catch (error) {
      setCustomerCategory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCompanyCustomersOptions = useCallback(async (category_id: string | number) => {
    // Keep loading false here to avoid flipping global loading unexpectedly; caller may manage UI.
    setLoading(false);
    try {
      // call getCompanyCustomers with category_id
      const res = await getCompanyCustomers({ category_id: String(category_id) });
      const normalize = (r: unknown): CustomerItem[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as CustomerItem[];
        }
        if (Array.isArray(r)) return r as CustomerItem[];
        return [];
      };
      setCompanyCustomersData(normalize(res));
    } catch (error) {
      setCompanyCustomersData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchItemOptions = useCallback(async (category_id: string | number) => {
    // Keep loading false here to avoid flipping global loading unexpectedly; caller may manage UI.
    setLoading(false);
    try {
      // call itemList with category_id to fetch items for this category
      const res = await itemList({ category_id: String(category_id) });
      const normalize = (r: unknown): Item[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as Item[];
        }
        if (Array.isArray(r)) return r as Item[];
        return [];
      };
      setItem(normalize(res));
    } catch (error) {
      setItem([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRouteOptions =  useCallback(async (warehouse_id: string | number) => {
    setLoading(false);
    try {
      // call routeList with warehouse_id
      const res = await routeList({ warehouse_id: String(warehouse_id),dropdown:"true"  });
      const normalize = (r: unknown): RouteItem[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as RouteItem[];
        }
        if (Array.isArray(r)) return r as RouteItem[];
        return [];
      };
      setRouteListData(normalize(res));
    } catch (error) {
      setRouteListData([]);
    } finally {
      setLoading(false);
    }
  },[]);
  const fetchRoutebySalesmanOptions =  useCallback(async (salesman_id: string | number) => {
    setLoading(false);
    try {
      // call routeList with warehouse_id
      const res = await routeList({ salesman_id: String(salesman_id)});
      const normalize = (r: unknown): RouteItem[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as RouteItem[];
        }
        if (Array.isArray(r)) return r as RouteItem[];
        return [];
      };
      setRouteListBySalesman(normalize(res));
    } catch (error) {
      setRouteListBySalesman([]);
    } finally {
      setLoading(false);
    }
  },[]);

  const fetchWarehouseOptions = useCallback(async (area_id: string | number) => {
    // Keep loading false here to avoid flipping global loading unexpectedly; caller may manage UI.
    setLoading(false);
    try {
      // call getWarehouse with an object matching the expected Params shape
      const res = await getWarehouse({ area_id: String(area_id),dropdown:"true" });
      const normalize = (r: unknown): WarehouseItem[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as WarehouseItem[];
        }
        if (Array.isArray(r)) return r as WarehouseItem[];
        return [];
      };
      setWarehouseListData(normalize(res));
    } catch (error) {
      setWarehouseListData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRegionOptions = useCallback(async (company_id: string | number) => {
    // Keep loading false here to avoid flipping global loading unexpectedly; caller may manage UI.
    setLoading(false);
    try {
      // call regionList with company_id
      const res = await regionList({ company_id: String(company_id),dropdown:"true" });
      const normalize = (r: unknown): RegionItem[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as RegionItem[];
        }
        if (Array.isArray(r)) return r as RegionItem[];
        return [];
      };
      setRegionListData(normalize(res));
    } catch (error) {
      setRegionListData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchItemSubCategoryOptions = async (category_id: string | number) => {
    setLoading(false);
    try {
      // call itemSubCategory with category_id
      const res = await itemSubCategory({ category_id: String(category_id) });
      const normalize = (r: unknown): ItemSubCategoryItem[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as ItemSubCategoryItem[];
        }
        if (Array.isArray(r)) return r as ItemSubCategoryItem[];
        return [];
      };
      setItemSubCategoryData(normalize(res));
    } catch (error) {
      setItemSubCategoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgentCustomerOptions = useCallback(async (warehouse_id: string | number) => {
    setLoading(false);
    try {
      // call agentCustomerList with warehouse_id
      const res = await agentCustomerList({ warehouse_id: String(warehouse_id) });
      const normalize = (r: unknown): AgentCustomerList[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as AgentCustomerList[];
        }
        if (Array.isArray(r)) return r as AgentCustomerList[];
        return [];
      };
      setAgentCustomer(normalize(res));
    } catch (error) {
      setAgentCustomer([]);
    } finally {
      setLoading(false);
    }
  }, []);

    const fetchSalesmanOptions = useCallback(async (warehouse_id: string | number) => {
    // Keep loading false here to avoid flipping global loading unexpectedly; caller may manage UI.
    setLoading(false);
    try {
      // call salesmanList with warehouse_id
      const res = await salesmanList({ warehouse_id: String(warehouse_id) });
      const normalize = (r: unknown): SalesmanList[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as SalesmanList[];
        }
        if (Array.isArray(r)) return r as SalesmanList[];
        return [];
      };
      setSalesman(normalize(res));
    } catch (error) {
      setSalesman([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSalesmanByRouteOptions = useCallback(async (route_id: string | number) => {
    // Keep loading false here to avoid flipping global loading unexpectedly; caller may manage UI.
    setLoading(false);
    try {
      // call salesmanList with warehouse_id
      const res = await salesmanList({ route_id: String(route_id) });
      const normalize = (r: unknown): SalesmanList[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as SalesmanList[];
        }
        if (Array.isArray(r)) return r as SalesmanList[];
        return [];
      };
      setSalesman(normalize(res));
    } catch (error) {
      setSalesman([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshDropdowns = async () => {
    setLoading(true);
    try {
      const res = await Promise.all([
        companyList(),
        countryList(),
        regionList(),
        SurveyList(),
        routeList({}),
        getWarehouse(),
        routeType(),
        getSubRegion(),
        getCompanyCustomers(),
        getCompanyCustomersType(),
        itemCategory(),
        itemSubCategory(),
        channelList(),
        getCustomerType(),
        userTypes(),
        salesmanTypeList({}),
        vehicleListData(),
        customerCategoryList(),
        customerSubCategoryList(),
        itemList(),
        getDiscountTypeList(),
        getMenuList(),
        vendorList(),
        salesmanList(),
        agentCustomerList(),
        shelvesList(),
        submenuList(),
        permissionList(),
        labelList(),
        roleList(),
        projectList({}),
      ]);


      // normalize: accept unknown response and extract array of items from `.data` when present
      const normalize = (r: unknown): unknown[] => {
        if (r && typeof r === 'object') {
          const obj = r as Record<string, unknown>;
          if (Array.isArray(obj.data)) return obj.data as unknown[];
        }
        if (Array.isArray(r)) return r as unknown[];
        return (r as unknown) ? [r as unknown] : [];
      };

      setCompanyListData(normalize(res[0]) as CompanyItem[]);
      setCountryListData(normalize(res[1]) as CountryItem[]);
      setRegionListData(normalize(res[2]) as RegionItem[]);
      setSurveyListData(normalize(res[3]) as SurveyItem[]);
      setRouteListData(normalize(res[4]) as RouteItem[]);
      setWarehouseListData(normalize(res[5]) as WarehouseItem[]);
      setRouteTypeData(normalize(res[6]) as RouteTypeItem[]);
      setAreaListData(normalize(res[7]) as AreaItem[]);
      setCompanyCustomersData(normalize(res[8]) as CustomerItem[]);
      setCompanyCustomersTypeData(normalize(res[9]) as CustomerTypeItem[]);
      setItemCategoryData(normalize(res[10]) as ItemCategoryItem[]);
      setItemSubCategoryData(normalize(res[11]) as ItemSubCategoryItem[]);
      setChannelListData(normalize(res[12]) as ChannelItem[]);
      setCustomerTypeData(normalize(res[13]) as CustomerType[]);
      setUserTypesData(normalize(res[14]) as UserTypeItem[]);
      setSalesmanTypesData(normalize(res[15]) as SalesmanType[]);
      setVehicleList(normalize(res[16]) as VehicleListItem[]);
      setCustomerCategory(normalize(res[17]) as CustomerCategory[]);
      setCustomerSubCategory(normalize(res[18]) as CustomerSubCategory[]);
      setItem(normalize(res[19]) as Item[]);
      setDiscountType(normalize(res[20]) as DiscountType[]);
      setMenuList(normalize(res[21]) as MenuList[]);
      setVendor(normalize(res[22]) as VendorList[]);
      setSalesman(normalize(res[23]) as SalesmanList[]);
      setAgentCustomer(normalize(res[24]) as AgentCustomerList[]);
      setShelves(normalize(res[25]) as ShelvesList[]);
      setSubmenu(normalize(res[26]) as submenuList[]);
      setPermissions(normalize(res[27]) as permissionsList[]);
      setLabels(normalize(res[28]) as LabelItem[]);
      setRoles(normalize(res[29]) as Role[]);
      setProject(normalize(res[30]) as Project[]);

    } catch (error) {
      console.error('Error loading dropdown data:', error);
      // on error clear to empty arrays
      setCompanyListData([]);
      setCountryListData([]);
      setRegionListData([]);
      setSurveyListData([]);
      setRouteListData([]);
      setWarehouseListData([]);
      setRouteTypeData([]);
      setAreaListData([]);
      setCompanyCustomersData([]);
      setCompanyCustomersTypeData([]);
      setItemCategoryData([]);
      setItemSubCategoryData([]);
      setChannelListData([]);
      setCustomerTypeData([]);
      setUserTypesData([]);
      setSalesmanTypesData([]);
      setVehicleList([]);
      setCustomerCategory([]);
      setCustomerSubCategory([]);
      setItem([]);
      setDiscountType([]);
      setMenuList([]);
      setVendor([]);
      setSalesman([]);
      setAgentCustomer([]);
      setShelves([]);
      setSubmenu([]);
      setPermissions([]);
      setLabels([]);
      setRoles([]);
      setProject([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDropdowns();
  }, []);



  return (
    <AllDropdownListDataContext.Provider
      value={{
        companyList: companyListData,
        countryList: countryListData,
        regionList: regionListData,
        SurveyList: surveyListData,
        routeList: routeListData,
        warehouseList: warehouseListData,
        routeType: routeTypeData,
        areaList: areaListData,
        companyCustomers: companyCustomersData,
        companyCustomersType: companyCustomersTypeData,
        itemCategory: itemCategoryData,
        itemSubCategory: itemSubCategoryData,
        channelList: Array.isArray(channelListData) ? channelListData : [],
        customerType: customerTypeData,
        userTypes: userTypesData,
        salesmanType: salesmanTypesData,
        vehicleList: VehicleList,
        customerCategory: customerCategory,
        customerSubCategory: customerSubCategory,
        item: item,
        discountType: discountType,
        menuList: menuList,
        labels: labels,
        roles: roles,
        projectList: project,
        fetchItemSubCategoryOptions,
        fetchAgentCustomerOptions,
        fetchSalesmanOptions,
        fetchSalesmanByRouteOptions,
        fetchRegionOptions,
        companyOptions,
        countryOptions,
        onlyCountryOptions,
        countryCurrency,
        regionOptions,
        surveyOptions,
        routeOptions,
        warehouseOptions,
        routeTypeOptions,
        areaOptions,
        companyCustomersOptions,
        companyCustomersTypeOptions,
        itemCategoryOptions,
        itemSubCategoryOptions,
        channelOptions,
        customerTypeOptions,
        userTypeOptions,
        salesmanTypeOptions,
        vehicleListOptions,
        customerCategoryOptions,
        customerSubCategoryOptions,
        itemOptions,
        discountTypeOptions,
        menuOptions,
        vendorOptions,
        salesmanOptions,
        agentCustomerOptions,
        shelvesOptions,
        submenuOptions,
        permissions,
        labelOptions,
        refreshDropdowns,
        fetchAreaOptions,
        fetchRouteOptions,
        fetchRoutebySalesmanOptions,
        fetchCustomerCategoryOptions,
        fetchCompanyCustomersOptions,
        fetchItemOptions,
        fetchWarehouseOptions,
        roleOptions,
        projectOptions,
        getItemUoms,
        getPrimaryUom,
        loading
      }}
    >
      {children}
    </AllDropdownListDataContext.Provider>
  );
};