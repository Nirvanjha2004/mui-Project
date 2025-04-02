import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Newspaper } from 'lucide-react';
import React from "react";

interface cardProps {
  title: string, 
  description: string,
  buttonText: string,
  value: string,
  icon?: React.ReactNode,
  onClick?: () => void
}

function CardComp({title, description, value, buttonText, icon, onClick}: cardProps) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow w-full">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {icon ? icon : <Newspaper className="h-5 w-5 text-gray-500" />}
        </div>
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex justify-between items-baseline">
            <CardDescription className="text-xs">{description}</CardDescription>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{value}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2 text-xs"
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export default CardComp;
