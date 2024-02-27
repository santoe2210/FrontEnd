import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const InputFieldCalendar = ({
  form,
  name,
  label,
  placeholder,
  desc,
  minDate = new Date(),
  maxDate = new Date(),
}) => {
  return (
    <div className="mt-6">
      {" "}
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{label} </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {console.log(field.value)}
                    {field.value ? (
                      <span>{moment(field.value).format("DD-MM-YYYY")}</span>
                    ) : (
                      <span>{placeholder} </span>
                    )}
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className="ml-auto h-4 w-4 opacity-50"
                    />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  fromDate={minDate}
                  toDate={maxDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>{desc}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputFieldCalendar;
