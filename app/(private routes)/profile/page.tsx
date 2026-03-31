import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import LocationsGrid from "@/components/LocationsGrid/LocationsGrid";
import css from "./ProfilePage.module.css";

export default function PrivateProfilePage() {
  return (
    <main className={css.profilePage}>
      <ProfileInfo isPrivate={true} />

      <div className={css.contentSection}>
        <h2 className={css.locationsTitle}>Локації</h2>
        <LocationsGrid isPrivate={true} />
      </div>
    </main>
  );
}
