import { Outlet } from "react-router";
import styles from "./app.module.css"

export function App() {
  return <div className={styles.root}><Outlet /></div>
}
