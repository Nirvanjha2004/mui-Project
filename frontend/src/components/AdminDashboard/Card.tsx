import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Newspaper } from 'lucide-react';


interface cardProps{
    title: string, 
    description: string,
    buttonText: string,
    value: string
}
function CardComp({title, description, value, buttonText}: cardProps) {
  return (
    <div className="min-w-xl">
      <Card>
        <CardHeader>
            <div className="flex justify-between">
            <CardTitle>{title}</CardTitle>
            <CardTitle><Newspaper/></CardTitle>
            </div>
          <div className="flex justify-between">
            <CardDescription>{description}</CardDescription>
            <CardDescription>{value}</CardDescription>
          </div>
          <Button>{buttonText}</Button>
        </CardHeader>
      </Card>
    </div>
  );
}

export default CardComp;
