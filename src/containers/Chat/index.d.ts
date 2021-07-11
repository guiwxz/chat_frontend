import React from "react";

export interface ChatProps {
  setData: React.Dispatch<any>;
  data: Array<any>;
}

export interface UserProps {
  nickname: string;
  codigo: number;
}