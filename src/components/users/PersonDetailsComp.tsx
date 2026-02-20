import { useState } from "react";
import toast from "react-hot-toast";
import { UserDetail, PersonDetails } from "../../types/user.types";
import {
  updateUserRegiStatusApi,
  updateUserBlockStatus,
  deleteUserVerificationApi,
  updateUserVerificationNoteApi,
  adminRequestUserIdApi,
  varicationSuspend,
} from "../../api/usersapi";
import { useNavigate } from "react-router";
import DetailItem from "./shared/DetailItem";
import VerificationSection from "./shared/VerificationSection";
import AdminNoteSection from "./shared/AdminNoteSection";
import ImageModal from "./shared/ImageModal";
import { getVerificationStatusColor } from "../../utils/statusUtils";

type Props = {
  user: UserDetail;
  personProfile: PersonDetails;
  verification?: any;
  onUpdate: () => void;
};

const IMAGE_URL = import.meta.env.VITE_API_BASE_URL;

const PersonDetailsComp = ({
  user,
  personProfile,
  verification,
  onUpdate,
}: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAdminRequestUserId = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }

    setLoading(true);
    try {
      await adminRequestUserIdApi(verification._id, user._id);
      toast.success("User ID request sent successfully");
      onUpdate();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to request User ID",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (noteText: string) => {
    setLoading(true);
    try {
      await updateUserVerificationNoteApi(user._id, noteText);
      toast.success("Note updated successfully");
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (type: "selfie" | "id") => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    setLoadingStates((prev) => ({ ...prev, [`approve-${type}`]: true }));
    try {
      await updateUserRegiStatusApi(
        user._id,
        verification._id,
        type,
        "Approve",
      );
      toast.success(
        `${type === "selfie" ? "Selfie" : "ID"} approved successfully`,
      );
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [`approve-${type}`]: false }));
    }
  };

  const handleReject = async (type: "selfie" | "id", reason: string) => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    setLoadingStates((prev) => ({ ...prev, [`reject-${type}`]: true }));
    try {
      await updateUserRegiStatusApi(
        user._id,
        verification._id,
        type,
        "Reject",
        reason,
      );
      toast.success(
        `${type === "selfie" ? "Selfie" : "ID"} rejected successfully`,
      );
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
      throw err;
    } finally {
      setLoadingStates((prev) => ({ ...prev, [`reject-${type}`]: false }));
    }
  };
  const handleVerficationSuspend = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    setLoadingStates((prev) => ({ ...prev, [`suspend`]: true }));
    try {
      await varicationSuspend(verification._id);
      toast.success(`Verification suspended successfully !`);
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
      throw err;
    } finally {
      setLoadingStates((prev) => ({ ...prev, [`suspend`]: false }));
    }
  };

  const handleDeleteVerification = async () => {
    if (!verification?._id) {
      toast.error("Verification ID not found");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this verification?",
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await deleteUserVerificationApi(verification._id);
      toast.success("Verification deleted successfully");
      onUpdate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async () => {
    setLoading(true);
    try {
      const newStatus = !user.isBlocked;
      await updateUserBlockStatus(user._id, newStatus);
      toast.success(newStatus ? "User blocked" : "User unblocked");
      onUpdate();
    } catch (err: any) {
      toast.error("Failed to update block status");
    } finally {
      setLoading(false);
    }
  };

  const detailsArray = personProfile?.details || [];

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBlockToggle}
              disabled={loading}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                user.isBlocked
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50"
                  : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50"
              }`}
            >
              {user.isBlocked ? "Unblock User" : "Block User"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* User Information Card - Full Width */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              User Information
            </h2>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getVerificationStatusColor(
                verification?.overallStatus,
              )}`}
            >
              {verification?.overallStatus}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <DetailItem label="Email" value={user.email} highlight />
            <DetailItem label="Username" value={user.username} />
            <DetailItem label="Full Name" value={user.name} />
            <DetailItem label="Role" value={user.role} />
            <DetailItem label="Gender" value={user.registrationRole} />
            <DetailItem
              label="Date of Birth"
              value={
                user.dob
                  ? new Date(user.dob).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "-"
              }
            />
            <DetailItem
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <DetailItem
              label="Status"
              value={user.isOnline ? "Online" : "Offline"}
            />
          </div>
        </div>

        {/* Person Profile & Details - Combined Section */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
            Person Profile & Details
          </h2>

          <div className="space-y-6">
            {/* Profile Image and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6">
              {personProfile?.profileImg && (
                <div className="flex-shrink-0">
                  <div
                    className="relative group cursor-pointer w-32 h-32"
                    onClick={() =>
                      setImageModal(
                        `${IMAGE_URL}/uploads/profileImage/${personProfile.profileImg}`,
                      )
                    }
                  >
                    <img
                      src={`${IMAGE_URL}/uploads/profileImage/${personProfile.profileImg}`}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 group-hover:border-brand-500 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        Click to zoom
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DetailItem
                  label="About Me"
                  value={personProfile?.aboutMe}
                  highlight
                />
                <DetailItem
                  label="Hosting Status"
                  value={personProfile?.hostingStatus}
                />
                <DetailItem
                  label="Travel Status"
                  value={personProfile?.travelStatus}
                />
              </div>
            </div>

            {/* Personal Details Sections */}
            {detailsArray.map((detail: any, index: number) => (
              <div
                key={detail._id}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5"
              >
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {detailsArray.length > 1
                    ? `Partner ${index + 1} Details`
                    : "Personal Details"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  <DetailItem label="Full Name" value={detail.name} highlight />
                  <DetailItem label="Height" value={detail.height} />
                  <DetailItem label="Body Type" value={detail.bodyType} />
                  <DetailItem label="Sexuality" value={detail.sexuality} />
                  <DetailItem label="Smoking" value={detail.smoking} />
                  <DetailItem label="Drinking" value={detail.drinking} />
                  <DetailItem label="Tattoos" value={detail.tattoos} />
                  <DetailItem label="Piercings" value={detail.piercings} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {personProfile?.interests?.length ? (
              personProfile.interests.map((interest: any) => (
                <span
                  key={interest._id}
                  className="px-3 py-1.5 bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 rounded-full text-sm font-medium"
                >
                  {interest.interestName}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No interests listed
              </span>
            )}
          </div>
        </div>

        {/* Looking For Section */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Looking For
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailItem
                label="Age Range"
                value={`${
                  personProfile?.lookingFor?.ageRange?.min || "-"
                } - ${personProfile?.lookingFor?.ageRange?.max || "-"}`}
                highlight
              />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Target Preferences
              </p>
              <div className="flex flex-wrap gap-2">
                {personProfile?.lookingFor?.targets?.length ? (
                  personProfile.lookingFor.targets.map(
                    (t: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full text-sm font-medium"
                      >
                        {t}
                      </span>
                    ),
                  )
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    No targets specified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <VerificationSection
          verification={verification}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDeleteVerification}
          onSuspend={handleVerficationSuspend}
          onRequestId={handleAdminRequestUserId} 
          loadingStates={loadingStates}
          loadingGlobal={loading}
          onImageClick={setImageModal}
        />

        <AdminNoteSection
          note={user.adminNote || ""}
          onSave={handleUpdateNote}
          loading={loading}
        />
      </div>
      <div className="px-6 py-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-end">
          <button
            onClick={handleAdminRequestUserId}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
          >
            Request User ID
          </button>
        </div>
      </div>

      {imageModal && (
        <ImageModal imageUrl={imageModal} onClose={() => setImageModal(null)} />
      )}
    </div>
  );
};

export default PersonDetailsComp;
