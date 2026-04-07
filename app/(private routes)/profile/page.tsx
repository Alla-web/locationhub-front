import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ProfileLocationsGrid from "@/components/ProfileLocationsGrid/ProfileLocationsGrid";
import css from "./ProfilePage.module.css";

export default function PrivateProfilePage() {
  return (
    <main className={css.profilePage}>
      <ProfileInfo isPrivate={true} />

      <div className={css.contentSection}>
        <ProfileLocationsGrid isPrivate={true} />
      </div>
    </main>
  );
}
