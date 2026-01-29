import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { Profile } from "../types/profile.types";
import { getProfileApi, updateProfileApi } from "../api/authapi";
import toast from "react-hot-toast";
import { useAppSelector } from "../store/hooks";

interface ProfileContextType {
    profile: Profile | null;
    loading: boolean;
    updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);

    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getProfileApi();
            setProfile(data);
        } catch {
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (payload: Partial<Profile>) => {
        try {
            await updateProfileApi(payload);
            toast.success("Profile updated");
            fetchProfile();
        } catch {
            toast.error("Update failed");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile();
        } else {
            setProfile(null);
        }
    }, [isAuthenticated]);

    return (
        <ProfileContext.Provider value={{ profile, loading, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const ctx = useContext(ProfileContext);
    if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
    return ctx;
};
