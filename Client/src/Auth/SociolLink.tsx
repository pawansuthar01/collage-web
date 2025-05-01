import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSocialData } from "../Redux/Slice/Admin";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../Redux/Store";
import LayoutAdmin from "../layout/AdminLayout";
import { getSocialLinkData } from "../Redux/Slice/getData";

interface SocialLinks {
  instagram: string;
  youtube: string;
  facebook: string;
  phoneNumber: number;
  email: string;
  address: string;
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
    youtube: "",
    facebook: "",
    phoneNumber: 0,
    email: "",
    address: "",
  });
  async function contactDataLoad() {
    const res = await dispatch(getSocialLinkData());
    if (res?.payload) {
      setData(res?.payload[0]);
    }
  }
  useEffect(() => {
    if (Data) {
      setFormData({
        instagram: Data.instagram || "",
        youtube: Data.youtube || "",
        facebook: Data.facebook || "",
        phoneNumber: Data.phoneNumber || 0,
        email: Data?.email || "",
        address: Data?.address || "",
      });
    }
  }, [Data]);
  useEffect(() => {
    contactDataLoad();
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.instagram ||
      !formData.youtube ||
      !formData.facebook ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.address
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
      <div className="max-w-lg mx-auto min-h-screen lg:p-8 p-2  mt-5 bg-[Var(--admin-bg-color)]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[Var(--admin-text-Primary-color)] ">
          Social Data Update
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[Var(--admin-bg-card-color)] border-[Var(--admin-border-color)] border rounded-md  p-2 m-2"
        >
          {[
            { label: "Instagram Link", name: "instagram", Type: "url" },
            { label: "Youtube Link", name: "youtube", Type: "url" },
            { label: "Facebook Link", name: "facebook", Type: "url" },
            { label: "Phone Number", name: "phoneNumber", Type: "number" },
            { label: "Email ", name: "email", Type: "email" },
            { label: "address ", name: "address", Type: "text" },
          ].map(({ label, name, Type }) => (
            <div className="mb-4" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-[Var(--admin-text-Secondary-color)] "
              >
                {label}
              </label>
              <input
                type={Type}
                id={name}
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded text-[Var(--input-text-color)] bg-[Var(--input-bg-color)] border-[Var(--input-border-color)]"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 px-4 bg-[Var(--dark-btnBg-color)] text-[Var(--admin-text-Primary-color)] font-medium rounded Admin_custom-hover "
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>
      </div>
    </LayoutAdmin>
  );
};

export default SocialUpdate;
