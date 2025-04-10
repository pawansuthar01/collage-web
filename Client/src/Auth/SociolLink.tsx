import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSocialData } from "../Redux/Slice/Admin";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../Redux/Store";
import LayoutAdmin from "../layout/AdminLayout";

interface SocialLinks {
  instagram: string;
  linkedin: string;
  facebook: string;
  git: string;
  x: string;
  cv: string;
}

const SocialUpdate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const { SocialLinkData } = useSelector(
    (state: RootState) => state?.storeData
  );
  const [Data, setData] = useState<SocialLinks>(SocialLinkData[0]);

  const [formData, setFormData] = useState<SocialLinks>({
    instagram: "",
    linkedin: "",
    facebook: "",
    git: "",
    x: "",
    cv: "",
  });

  useEffect(() => {
    if (Data) {
      setFormData({
        instagram: Data.instagram || "",
        linkedin: Data.linkedin || "",
        facebook: Data.facebook || "",
        git: Data.git || "",
        x: Data.x || "",
        cv: Data.cv || "",
      });
    }
  }, [Data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.instagram ||
      !formData.linkedin ||
      !formData.facebook ||
      !formData.git ||
      !formData.x ||
      !formData.cv
    ) {
      toast.error("All social links are required to update.");
      return;
    }

    try {
      setLoading(true);
      const response = await dispatch(updateSocialData(formData));
      setLoading(false);

      if (response.payload.success) {
        toast.success(response.payload.message);
        setData(response.payload.data);
      } else {
        toast.error(response.payload.message);
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <LayoutAdmin>
      <div className="max-w-lg mx-auto min-h-screen lg:p-8 p-2 mt-20 mb-2 bg-[#242424]">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-white">
          Social Data Update
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#333] border-cyan-200 border-1 rounded-md shadow-[0_0_5px_0_cyan] p-2 m-2"
        >
          {[
            { label: "CV Link", name: "cv" },
            { label: "Instagram Link", name: "instagram" },
            { label: "Facebook Link", name: "facebook" },
            { label: "X Link", name: "x" },
            { label: "LinkedIn Link", name: "linkedin" },
            { label: "Git Account Link", name: "git" },
          ].map(({ label, name }) => (
            <div className="mb-4" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                {label}
              </label>
              <input
                type="url"
                id={name}
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded text-white"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>
      </div>
    </LayoutAdmin>
  );
};

export default SocialUpdate;
