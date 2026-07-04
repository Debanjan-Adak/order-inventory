import { Check } from "lucide-react";
import "./ShipmentTimeline.css";
const STEPS = [
  { key: "CREATED", label: "Created" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "DELIVERED", label: "Delivered" },
];

export function ShipmentTimeline({ status }) {
  const currentIndex = STEPS.findIndex((step) => step.key === status);

  return (
    <ol className="shipment-timeline">
      {STEPS.map((step, index) => {
        const isPast = currentIndex >= 0 && index < currentIndex;
        const isCurrent = index === currentIndex;
        const isReached = isPast || isCurrent;

        return (
          <li
            key={step.key}
            className={[
              "shipment-timeline__step",
              isReached ? "shipment-timeline__step--reached" : "",
              isPast ? "shipment-timeline__step--past" : "",
              isCurrent ? "shipment-timeline__step--current" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="shipment-timeline__marker" aria-hidden="true">
              {isPast ? <Check size={14} strokeWidth={2.5} /> : null}
              {isCurrent ? <span className="shipment-timeline__dot" /> : null}
            </span>
            <span className="shipment-timeline__label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default ShipmentTimeline;
