import { permanentRedirect } from "next/navigation";

import { DETAIL_PATH } from "@/lib/constants";

export default function HomePage() {
  permanentRedirect(DETAIL_PATH);
}
