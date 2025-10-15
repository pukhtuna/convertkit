import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ConversionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  gradient?: "primary" | "secondary";
}

export const ConversionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  to,
  gradient = "primary" 
}: ConversionCardProps) => {
  return (
    <Link to={to}>
      <Card className="group relative overflow-hidden border-2 border-border bg-card p-6 shadow-card transition-smooth hover:shadow-card-hover hover:scale-[1.02] hover:border-primary cursor-pointer backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-10 transition-smooth group-hover:opacity-20">
          <div className={gradient === "primary" ? "gradient-primary w-full h-full rounded-full blur-2xl" : "gradient-secondary w-full h-full rounded-full blur-2xl"} />
        </div>
        
        <div className="relative">
          <div className={`inline-flex p-3 rounded-xl mb-4 ${gradient === "primary" ? "gradient-primary" : "gradient-secondary"}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-smooth">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  );
};
