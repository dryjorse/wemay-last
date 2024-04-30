export interface IResults<T> {
  count: number;
  results: T[];
}

export interface ICompany {
  id: number;
  image: string;
  promotions_count: number;
  name: string;
  discounts: number;
  description: string;
  owner: string;
}

export interface ICategory {
  link: string;
  title: string;
  image: string;
  icon: string;
  parent_category: string;
  count_category: string;
}

export interface IPromotion {
  id: number;
  title: string;
  old_price: number;
  new_price: number;
  discount: number;
  likes: number[];
  image: string;
  slider_image: string;
  contacts: string;
  workTime: string;
  end_date: string;
  description: string;
  address: string;
}

export type IPromotionCard = Pick<
  IPromotion,
  "title" | "old_price" | "new_price" | "discount" | "likes" | "image" | "id"
>;

export interface IAddress {
  lat: string;
  lon: string;
  display_name: string;
}

export interface IReview {
  ava: string;
  name: string;
  pastTense: string;
  comment: string;
  likes: number;
}

export interface IUser {
  username: string;
  fullname: string;
  id: number;
  email: string;
  image: string;
}

export interface MyKnownError {
  errorMessage: string;
}

export interface IAuthFields {
  email: string;
  password: string;
  isRemember: boolean;
}

export interface IPromotionFields {
  title: string;
  image: FileList;
  description: string;
  companyName: string;
  schedule: string;
  categories: string[];
  type: string;
  price: number;
  oldPrice: number;
  contacts: string[];
  address: string;
}

export interface IValidationError {
  message: string;
  type: string;
}

export interface IRegisterResponse {
  message: string;
  tokens: { access: string; refresh: string };
  // access_token: string;
  // expires_in: number;
  // token_type: string;
  // scope: string;
  // refresh_token: string;
}

export interface IScheduleWeekDay {
  day: string;
  isActive: boolean;
  time: { from: string; to: string };
}

export type ILoginResponse = Omit<IRegisterResponse, "message">;
