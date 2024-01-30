"use client";
import {
  useOrganization,
  useOrganizationList,
} from "@clerk/nextjs";
interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
};

export const Item = ({
  id,
  name,
  imageUrl,
}: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <div className="tooltip tooltip-bottom"
        data-tip={name}>
        <div className="avatar">
  <div className="w-24 rounded">
    <img src={imageUrl}
    alt={name}
    onClick={onClick}/>
  </div>
</div>
      </div>
    </div>
  );
};