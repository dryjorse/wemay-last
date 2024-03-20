export interface ICompany {
  link: string;
  logo: string;
  promotionsCount: number;
  maxDiscounts: number;
}

export interface IPromotion {
  name: string;
  initPrice: number;
  price: number;
  discountPercentage: number;
  likes: number;
  image: string;
  link: string;
  contacts: string[];
  workTime: string;
  images: string[];
  end: string;
  description: string;
  address: {
    name: string;
    coordinates: number[];
  };
}

export type IPromotionCard = Pick<
  IPromotion,
  | "name"
  | "initPrice"
  | "price"
  | "discountPercentage"
  | "likes"
  | "image"
  | "link"
>;

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
  addresses: string[];
}

export interface IValidationError {
  message: string;
  type: string;
}

export interface IRegisterResponse {
  message: string;
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface IScheduleWeekDay {
  day: string;
  isActive: boolean;
  time: { from: string; to: string };
}

export type ILoginResponse = Omit<IRegisterResponse, "message">;
