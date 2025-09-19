"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/app/services/allApi";
import { useSnackbar } from "@/app/services/snackbarContext";
import InputFields from "@/app/components/inputFields";
import SidebarBtn from "@/app/components/dashboardSidebarBtn";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

import { Formik, Form, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";

// ✅ Yup Validation Schema
const UserSchema = Yup.object().shape({
  code: Yup.string().required("Code is required."),
  name: Yup.string().required("Name is required."),
  status: Yup.string().required("Status is required."),
});

type UserForm = {
  code: string;
  name: string;
  status: string;
};

export default function UpdateUserPage() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const { id } = useParams<{ id: string }>();

  const [initialValues, setInitialValues] = useState<UserForm>({
    code: "",
    name: "",
    status: "active",
  });

  // ✅ Fetch existing user by id
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await getUserById(String(id));
        const data = res.data;
        setInitialValues({
          code: data.code ?? "",
          name: data.name ?? "",
          status: data.status ?? "active",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchData();
  }, [id]);

  // ✅ Submit update
  const handleSubmit = async (
    values: UserForm,
    { setSubmitting }: FormikHelpers<UserForm>
  ) => {
    try {
      await updateUser(String(id), values);
      showSnackbar("User updated successfully ✅", "success");
      router.push("/dashboard/settings/user-types");
    } catch (err) {
      console.error("Update failed:", err);
      showSnackbar("Failed to update ❌", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full overflow-x-hidden p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/settings/user-types">
            <Icon icon="lucide:arrow-left" width={24} />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Update User</h1>
        </div>
      </div>

      {/* ✅ Formik */}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="bg-white rounded-2xl shadow divide-y divide-gray-200 mb-6">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  User Type Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Code */}
                  <div>
                    <InputFields
                      label="Code"
                      name="code"
                      value={values.code}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="code"
                      component="span"
                      className="text-xs text-red-500"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <InputFields
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className="text-xs text-red-500"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <InputFields
                      label="Status"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="status"
                      component="span"
                      className="text-xs text-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => router.push("/dashboard/settings/user-types")}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <SidebarBtn
                label="Update"
                isActive={true}
                leadingIcon="mdi:check"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
