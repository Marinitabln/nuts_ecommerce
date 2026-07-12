import { Trash2 } from "lucide-react";
import { AuthUser } from "@/services/uses-case/auth-service";

interface UsersMobileCardProps {
  users: AuthUser[];
  currentEmail?: string;
  isRoleChangeDisabled: boolean;
  isDeleteDisabled: boolean;
  onRoleChange: (id: string, role: "admin" | "customer") => void;
  onDelete: (id: string, name: string) => void;
}

const UsersMobileCard = ({
  users,
  currentEmail,
  isRoleChangeDisabled,
  isDeleteDisabled,
  onRoleChange,
  onDelete,
}: UsersMobileCardProps) => {
  return (
    <div className="flex flex-col gap-4 md:hidden">
      {users.map((user) => {
        const isSelf = user.email === currentEmail;

        return (
          <div key={user.id} className="rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold leading-tight">
                  {user.name}
                  {isSelf && <span className="text-xs text-gray-400 font-normal"> (vos)</span>}
                </h3>
                <p className="text-sm text-gray-500 break-all">{user.email}</p>
              </div>

              <button
                onClick={() => onDelete(user.id, user.name)}
                disabled={isSelf || isDeleteDisabled}
                className="p-2 rounded-lg text-error disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{user.phone || "-"}</span>
              <span>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("es-AR")
                  : "-"}
              </span>
            </div>

            <select
              value={user.role}
              disabled={isSelf || isRoleChangeDisabled}
              onChange={(e) => onRoleChange(user.id, e.target.value as "admin" | "customer")}
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize border-none outline-none disabled:opacity-60 ${
                user.role === "admin"
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <option value="admin">Administrador</option>
              <option value="customer">Cliente</option>
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default UsersMobileCard;
