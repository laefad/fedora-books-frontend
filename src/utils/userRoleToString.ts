// Types
import { UserRole } from '@/generated';

export const userRoleToString = (role: UserRole | "") => {
    switch(role) {
      case UserRole.User: return "Пользователь";
      case UserRole.Admin: return "Администратор";
      case UserRole.Moderator: return "Модератор";
      case "": return ""; // Loading case
      default: throw new Error("Unknown user role!")
    }
}
