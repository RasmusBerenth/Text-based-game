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

            foreach (string events in eventGroups)
            {
                //Using regex to find individual items in the events file.
                Match eventInfo = Regex.Match(eventGroups[e], ".*:(.*)\\n.*:(.*)\\n.*:(.*)");

                //Using regex to find individual items in the choice file.
                string[] choicesPerEvent = choiceGroups[c].Split("\r\n\r");
                Match choiceInfo = Regex.Match(choicesPerEvent[c], "(\\d\\..*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)?");

                //Convert numerical string into int.
                int intConfidenceAlteration = Int32.Parse(choiceInfo.Groups[3].Value);
                int intAlarmLevelAlteration = Int32.Parse(choiceInfo.Groups[4].Value);
                int intMinimumConfidence = Int32.Parse(choiceInfo.Groups[5].Value);

                //Choice class definition.
                var choices = new Choice();
                choices.Name = choiceInfo.Groups[1].Value;
                choices.Narration = choiceInfo.Groups[2].Value;
                choices.ConfidenceAlteration = intConfidenceAlteration;
                choices.AlarmLevelAlteration = intAlarmLevelAlteration;
                choices.MinimumConfidence = intMinimumConfidence;
                choices.EventRequirement = choiceInfo.Groups[6].Value;

                //Adding choices into a list that goes to event class.
                foreach (string choice in choicesPerEvent)
                {
                    eventChoices.Add(choices);
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
                foreach (Choice choice in newEvent.Choices)
                {
                    Console.WriteLine(choices.Name);

                }
                confidence += choices.ConfidenceAlteration;
                alarmLevel += choices.AlarmLevelAlteration;

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

                eventChoices.Clear();
                e++;
                c++;
            }

        }
    }
}
