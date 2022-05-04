using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace Text_based_game
{
    class Event
    {
        public string Name;
        public string Narration;
        public string SpecialItem;
        public List<Choice> Choices;
    }
    class Choice
    {
        public int MinimumConfidence;
        public int ConfidenceAlteration;
        public int AlarmLevelAlteration;
        public string EventRequirement;
        public string Narration;
        public string Name;
    }
    internal class Program
    {
        //static bool checkConditions(string specialItem, int confidence, int alarmLevel, List<Event>storyline)
        //{

        //}
        static void Main(string[] args)
        {
            int confidence = 1;
            int alarmLevel = 0;
            string input;

            //List of events the player has cleared.
            var storyline = new List<Event>();
            //List of special item player has gained.
            var inventory = new List<string>();
            //List of choices in individual events.
            var eventChoices = new List<Choice>();

            //Reading files and then splitting them.
            string eventsPath = "Events.txt";
            string eventsText = File.ReadAllText(eventsPath);
            string[] eventGroups = eventsText.Split("\r\n\r");

            string choicesPath = "Choices.txt";
            string choicesText = File.ReadAllText(choicesPath);
            string[] choiceGroups = choicesText.Split("\r\n\r\n\r\n");

            //Game intro.
            Console.WriteLine("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair.\nThe thief has gathered what confidence they could find and has made it this far...\nWill their confidence grow or fallter? Will the dragon spot them or will they go unseen...\nOnly time will tell...");
            Console.WriteLine("\nPress any button to commence with the theft.");
            input = Console.ReadLine();

            int e = 0;
            int c = 0;

            do
            {
                //Using regex to find individual items in the events file.
                Match eventInfo = Regex.Match(eventGroups[e], ".*:(.*)\\n.*:(.*)\\n.*:(.*)");

                //Using regex to find individual items in the choice file.

                string[] choicesPerEvent = choiceGroups[c].Split("\r\n\r");
                string choicesPerEventString = String.Concat(choicesPerEvent);

                MatchCollection choiceInfoCollection = Regex.Matches(choicesPerEventString, "(\\d\\..*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)?");


                foreach (Match choiceInfo in choiceInfoCollection)
                {
                    GroupCollection group = choiceInfo.Groups;

                    //Convert numerical string into int.
                    int intConfidenceAlteration = Int32.Parse(choiceInfo.Groups[3].Value);
                    int intAlarmLevelAlteration = Int32.Parse(choiceInfo.Groups[4].Value);
                    int intMinimumConfidence = Int32.Parse(choiceInfo.Groups[5].Value);

                    //Choice class definition.
                    var choice = new Choice();
                    choice.Name = choiceInfo.Groups[1].Value;
                    choice.Narration = choiceInfo.Groups[2].Value;
                    choice.ConfidenceAlteration = intConfidenceAlteration;
                    choice.AlarmLevelAlteration = intAlarmLevelAlteration;
                    choice.MinimumConfidence = intMinimumConfidence;
                    choice.EventRequirement = choiceInfo.Groups[6].Value;

                    //Adding choices into a list that goes to event class.
                    eventChoices.Add(choice);
                }

                //Event class definition.
                var newEvent = new Event();
                newEvent.Name = eventInfo.Groups[1].Value;
                newEvent.Narration = eventInfo.Groups[2].Value;
                newEvent.SpecialItem = eventInfo.Groups[3].Value;
                newEvent.Choices = eventChoices;

                //Clearing previous text and output UI.
                Console.Clear();
                Console.WriteLine($"Confidence:{confidence} Alarm Level:{alarmLevel}\n");
                Console.WriteLine(newEvent.Narration);
                foreach (Choice choice in eventChoices)
                {
                    Console.WriteLine(choice.Name);
                }


                do
                {
                    input = Console.ReadLine();
                    if (Regex.IsMatch(input, "[1-3]"))
                    {
                        break;
                    }
                    else
                    {
                        Console.WriteLine("That isen't an option... Try again!");
                    }

                } while (true);

                if (Regex.IsMatch(newEvent.Name, "Knights camp") && (input == "1"))
                {
                    inventory.Add(newEvent.SpecialItem);
                }

                eventChoices.Clear();
                e++;
                c++;

            } while (e < 3);

        }
    }
}
