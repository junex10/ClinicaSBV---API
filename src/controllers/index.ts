// Web

import { AuthModule } from "./web/auth/auth.module";
import { PetitionModule } from "./web/petition/petition.module";
import { NotificationsModule } from "./web/notifications/notifications.module";
import { ProfileModule } from "./web/profile/profile.module";

// Admin
import { AdminModule } from "./web/admin/admin.module";

// Patient
import { PatientModule } from "./web/patient/patient.module";

// Boss
import { BossModule } from "./web/boss/boss.module";

// Secretary
import { SecretaryModule } from "./web/secretary/secretary.module";

//Doctor
import { DoctorModule } from "./web/doctor/doctor.module";

export {
    AuthModule,
    PetitionModule,
    NotificationsModule,
    ProfileModule,
    PatientModule,
    AdminModule,
    BossModule,
    DoctorModule,
    SecretaryModule
}