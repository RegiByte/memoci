import React, { useContext, useEffect, useState } from "react"
import { AppStorage } from "./index"

export const AppStorageContext = React.createContext<Omit<AppStorage, "setup">>(
  {} as any
)