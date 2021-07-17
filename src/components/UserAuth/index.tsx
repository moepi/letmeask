import { useAuth } from "../../hooks/useAuth";
import "./styles.scss";

export function UserAuth() {
  const { user, signOutGoogle } = useAuth();

  return (
    <div id="user-auth">
      {user && (
        <button type="button" onClick={signOutGoogle} title={user?.email}>
          Logout
          <img src={user?.avatar} alt={user?.name} />
        </button>
      )}
    </div>
  );
}