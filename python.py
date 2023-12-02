total = 0

digit_map = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    }

with open('input.txt', 'r') as file:
    for line in file:
        cal_val = ""
        row = line
        for text_digit, num_digit in digit_map.items():
            row = row.replace(text_digit, num_digit)
        for char in row:
            if char.isdigit():
                cal_val += char
        cal_val = cal_val[0] + cal_val[-1]
        total += int(cal_val)
        # print(cal_val)
        

print(total)