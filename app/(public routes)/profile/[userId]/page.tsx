import { Metadata } from "next";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ProfileLocationsGrid from "@/components/ProfileLocationsGrid/ProfileLocationsGrid";
import styles from "../../../(private routes)/profile/ProfilePage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return { title: `Профіль користувача | RelaxMap` };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <main className={styles.profilePage}>
      <ProfileInfo isPrivate={false} userId={userId} />

      <div className={styles.contentSection}>
        <h2 className={styles.locationsTitle}>Локації</h2>
        <ProfileLocationsGrid isPrivate={false} userId={userId} />
      </div>
    </main>
  );
}
