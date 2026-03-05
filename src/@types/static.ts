export interface ICountry {
  country?: string;
  currency_code?: string;
  currency_name?: string;
  language?: string;
}

export interface ISession {
  id: number;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
}

export interface IMenuItem {
  id: number;
  title: string;
  url: string;
  isActive?: boolean;
  icon?: React.ComponentType<any>;
  subMenus?: IMenuItem[];
}
