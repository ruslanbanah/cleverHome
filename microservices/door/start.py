#!/usr/bin/python

# -*- coding: utf-8 -*-

import MySQLdb as mdb
import RPi.GPIO as RPIO
import time
import telebot, config

door_sensor = 12
door_log = open(config.LOG.path + 'door.log', 'a',0)
db_conect = mdb.connect(config.DB.host, config.DB.user, config.DB.password , config.DB.database);

bot = telebot.TeleBot(config.TELEGRAM.token)
@bot.message_handler(commands=['knock'])
def echo_msg(message):
    bot.send_message(message.chat.id, "Who's there?")
    door_log.write (time.strftime("%d.%m.%Y %H:%M:%S")+"\tBot: knok\r\n")

@bot.message_handler(commands=['start'])
def handle_start_help(message):
    config.TELEGRAM.chatid = message.chat.id
    door_log.write (time.strftime("%d.%m.%Y %H:%M:%S")+"\tBot: start chating, chat ID_" + str(config.TELEGRAM.chatid) + "\r\n")
    bot.send_message(config.TELEGRAM.chatid, "Hi, i`m door-bot! Door sensor is activated.")

@bot.message_handler(commands=['stop'])
def handle_start_help(message):
    config.CHATID = ""
    door_log.write (time.strftime("%d.%m.%Y %H:%M:%S")+"\tBot: stop chating, chat ID_" + str(config.TELEGRAM.chatid) + "\r\n")
    bot.send_message(config.TELEGRAM.chatid, "Door sensor is deactivated.")

def write_door_state(e):
        if RPIO.input(door_sensor)==0:
                door_log.write (time.strftime("%d.%m.%Y %H:%M:%S")+"\tOpen\r\n")
                bot.send_message(config.TELEGRAM.root_chatid, "door OPENED!")
                if config.TELEGRAM.chatid:
                        bot.send_message(config.TELEGRAM.chatid, "door OPENED!")
                with con:
                        cur = db_conect.cursor()
                        cur.execute("INSERT INTO door(status) VALUES('open')")
                        db_conect.commit()
                        cur.close()

        else:
                door_log.write (time.strftime("%d.%m.%Y %H:%M:%S")+"\tClose\r\n")
                bot.send_message(config.TELEGRAM.root_chatid, "door CLOSED!")
                if config.TELEGRAM.chatid:
                        bot.send_message(config.TELEGRAM.chatid, "door CLOSED!")
                with con:
                        cur = db_conect.cursor()
                        cur.execute("INSERT INTO door(status) VALUES('close')")
                        db_conect.commit()
                        cur.close()


RPIO.setmode(RPIO.BOARD)
RPIO.setup(door_sensor, RPIO.IN)
RPIO.add_event_detect(door_sensor, RPIO.BOTH)
RPIO.add_event_callback(door_sensor, write_door_state)

try:
    print "Waiting for falling edge on port 12"
    #RPIO.wait_for_edge(door_sensor, RPIO.BOTH)
    if __name__ == '__main__':
        bot.polling(none_stop=True)
    while True:
        time.sleep(1)
    print "Falling edge detected. Here endeth the second lesson."

except KeyboardInterrupt:
    RPIO.cleanup()       # clean up GPIO on CTRL+C exit
RPIO.cleanup()           # clean up GPIO on normal exit
db_conect.close()
