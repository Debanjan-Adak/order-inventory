import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, RefreshCw } from "lucide-react";

import Modal from "../../../shared/components/common/Modal";
import ConfirmDialog from "../../../shared/components/common/ConfirmDialog";

import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";
import BanCustomerModal from "../components/BanCustomerModal";
import { useCustomers } from "../hooks/useCustomers";
import {
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from "../hooks/useCustomerMutations";
import "./Customers.css";

const STATUS_OPTIONS = [
  { value: "all", label: "All customers" },
  { value: "active", label: "Active" },
  { value: "blocked", label: "Blocked" },
];

function Customers() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Debounce the search box so we don't fire a request on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInput.trim()), 350);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const filters = useMemo(() => ({ search, status }), [search, status]);
  const { data, isLoading, isError, refetch } = useCustomers(filters);
  const customers = data?.customers ?? data ?? [];

  const [formModal, setFormModal] = useState({ open: false, customer: null });
  const [banTarget, setBanTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();
  const deleteCustomer = useDeleteCustomer();

  function handleSubmit(values, { setSubmitting }) {
    if (formModal.customer) {
      updateCustomer.mutate(
        { customerId: formModal.customer.customer_id, payload: values },
        {
          onSuccess: () => setFormModal({ open: false, customer: null }),
          onSettled: () => setSubmitting(false),
        }
      );
    } else {
      createCustomer.mutate(values, {
        onSuccess: () => setFormModal({ open: false, customer: null }),
        onSettled: () => setSubmitting(false),
      });
    }
  }

  function handleConfirmDelete() {
    deleteCustomer.mutate(deleteTarget.customer_id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">Manage customer accounts and access.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setFormModal({ open: true, customer: null })}
        >
          <Plus size={16} strokeWidth={2} className="me-1" />
          Add Customer
        </button>
      </div>

      <div className="customers-toolbar">
        <div className="customers-search">
          <Search size={16} strokeWidth={1.75} className="customers-search-icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search customers..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <select
          className="form-select customers-filter"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isError ? (
        <div className="customers-error-state">
          <p className="fw-medium mb-1">Something went wrong</p>
          <p className="text-muted small mb-3">
            We couldn't load customers. Check your connection and try again.
          </p>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => refetch()}>
            <RefreshCw size={14} strokeWidth={1.75} className="me-1" />
            Retry
          </button>
        </div>
      ) : (
        <CustomerTable
          customers={customers}
          isLoading={isLoading}
          onRowClick={(customer) => navigate(`/admin/customers/${customer.customer_id}`)}
          onEdit={(customer) => setFormModal({ open: true, customer })}
          onBanToggle={(customer) => setBanTarget(customer)}
          onDelete={(customer) => setDeleteTarget(customer)}
        />
      )}

      <Modal
        isOpen={formModal.open}
        title={formModal.customer ? "Edit customer" : "Add customer"}
        onClose={() => setFormModal({ open: false, customer: null })}
      >
        <CustomerForm
          initialValues={formModal.customer}
          isSubmitting={createCustomer.isPending || updateCustomer.isPending}
          onSubmit={handleSubmit}
          onCancel={() => setFormModal({ open: false, customer: null })}
        />
      </Modal>

      <BanCustomerModal
        customer={banTarget}
        isOpen={Boolean(banTarget)}
        onClose={() => setBanTarget(null)}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete this customer?"
        message={`This will permanently remove ${deleteTarget?.full_name ?? "this customer"} and cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        isLoading={deleteCustomer.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default Customers;
