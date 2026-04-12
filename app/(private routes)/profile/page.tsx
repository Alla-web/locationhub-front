import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ProfileLocationsGrid from "@/components/ProfileLocationsGrid/ProfileLocationsGrid";

import css from "./page.module.css";

export default function PrivateProfilePage() {
  return (
    <div className={css.pageWrapper}>
      <main className={css.profilePage}>
        <div className="container">
          <ProfileInfo isPrivate={true} />

          <div className={css.contentSection}>
            <ProfileLocationsGrid isPrivate={true} />
          </div>
        </div>
      </main>
    </div>
  );
}
