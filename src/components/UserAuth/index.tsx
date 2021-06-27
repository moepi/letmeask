import { useAuth } from "../../hooks/useAuth";
import "./styles.scss";

export function UserAuth() {
  const { user, signOutGoogle } = useAuth();

  return (
    <div id="user-auth">
      { user && (
        <button type="button" onClick={signOutGoogle}>
          Logout
          <img src={user?.avatar} alt={user?.name} title={user?.email} />
        </button>
      )}
    </div>
  );
}