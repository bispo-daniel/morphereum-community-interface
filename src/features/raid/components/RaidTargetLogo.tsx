import { instagramLogo } from "@/assets/logos";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const RaidTargetLogo = () => {
  return (
    <Card className="card-shadow-lg w-[20%]">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="flex h-[220px] w-[220px] select-none items-center justify-center space-x-4 rounded-full border p-4 text-sm">
          <img src={instagramLogo} draggable={false} className="w-[50%]" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default RaidTargetLogo;
