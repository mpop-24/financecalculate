"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Results } from "./Results";
} from "../components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Results } from "./Results"

const formSchema = z.object({
  yearsUntilRetirement: z.string(),
  currentSavings: z.string(),
  investorType: z.enum(["conservative", "moderate", "aggressive"]),
  contributionFrequency: z.enum(["weekly", "monthly"]),
  contributionAmount: z.string(),
});

export default function RetirementCalculator() {
  const [result, setResult] = React.useState<number | null>(null);
export function RetirementCalculator() {
  const [result, setResult] = React.useState<number | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearsUntilRetirement: "",
      currentSavings: "",
      investorType: "moderate",
      contributionFrequency: "monthly",
      contributionAmount: "",
    },
  });

  function calculateGrowth(values: z.infer<typeof formSchema>) {
    try {
      const initial = parseInt(values.currentSavings);
      const years = parseInt(values.yearsUntilRetirement);
      const contribution = parseInt(values.contributionAmount);

      // Determine rate based on investor type
      let rate: number;
      switch (values.investorType) {
        case "conservative":
          rate = 5; // 5% return
          break;
        case "moderate":
          rate = 8; // 8% return
          break;
        case "aggressive":
          rate = 11; // 11% return
          break;
      }

      // Convert rate to decimal
      rate = rate / 100;

      // Determine contribution frequency multiplier
      const frequencyMultiplier =
        values.contributionFrequency === "weekly" ? 52 : 12;

      // Calculate final amount using the compound interest formula
      const final =
        initial *
          (1 + rate / frequencyMultiplier) ** (years * frequencyMultiplier) +
        (contribution *
          ((1 + rate / frequencyMultiplier) ** (years * frequencyMultiplier) -
            1)) /
          (rate / frequencyMultiplier);
      const initial = parseInt(values.currentSavings)
      const years = parseInt(values.yearsUntilRetirement)
      const contribution = parseInt(values.contributionAmount)

      let rate: number
      switch (values.investorType) {
        case "conservative":
          rate = 5
          break
        case "moderate":
          rate = 8
          break
        case "aggressive":
          rate = 11
          break
      }

      rate = rate / 100

      const frequencyMultiplier = values.contributionFrequency === "weekly" ? 52 : 12

      const final = (initial * (1 + (rate/frequencyMultiplier)) ** (years * frequencyMultiplier)) +
                   (contribution * ((1 + (rate/frequencyMultiplier)) ** (years * frequencyMultiplier) - 1) / (rate/frequencyMultiplier))

      setResult(final);
    } catch (error) {
      console.error(error);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    calculateGrowth(values);
  }

  return (
    <div className="w-full py-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Retirement Calculator
          </CardTitle>
        </CardHeader>
        <CardDescription className="text-center">
          Calculate how much you'll have for retirement
        </CardDescription>
          <CardTitle className="text-2xl text-center">Retirement Calculator</CardTitle>
          <CardDescription className="text-center">Calculate how much you'll have for retirement</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="yearsUntilRetirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many years until retirement?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter years"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentSavings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much do you currently have saved?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investorType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What kind of investor are you?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investor type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="conservative">
                          Conservative (5% return)
                        </SelectItem>
                        <SelectItem value="moderate">
                          Moderate (8% return)
                        </SelectItem>
                        <SelectItem value="aggressive">
                          Aggressive (11% return)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contributionFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How often do you contribute?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contributionAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much do you contribute?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter contribution amount"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result !== null && (
        <Results
          finalAmount={result}
          disclaimer="*Disclaimer: This value is an estimate based on the average return rate you selected. Actual returns, and the amount you have at retirement, may vary."
        />
      )}
    </div>
  );
}
