import React from 'react';
import Icon from 'react-fontawesome';
import {Link} from 'react-router-dom';
import {css} from 'emotion';
import {Badge} from 'reactstrap';

module.exports = function(e) {
    var t = e.tag,
        a = e.hideDescription,
        r = "hashtag",
        s = t;

    return null == t
        ? <span />
        : (
            (t.startsWith("admin") || t.startsWith("system")) &&
                (r = "tag"),
            t.startsWith("author_tag") &&
                (r = "tag", s = t.replace("author_tag_", "")),
            "admin_moderator" === t &&
                (r = "life-ring", s = "Moderator"),
            "admin_scripting_access" === t &&
                (r = "handshake", s = "Scripting Access"),
            "admin_avatar_access" === t &&
                (r = "lock", s = "Forced Avatar Access"),
            "admin_world_access" === t &&
                (r = "lock", s = "Forced World Access"),
            "admin_lock_tags" === t &&
                (r = "lock", s = "Locked Tags"),
            "admin_lock_level" === t &&
                (r = "lock", s = "Locked Level"),
            "admin_can_grant_licenses" === t &&
                (r = "ticket-alt", s = "Can Grant Licenses"),
            "system_world_access" === t &&
                (r = "wrench", s = "SDK World Access"),
            "system_avatar_access" === t &&
                (r = "wrench", s = "SDK Avatar Access"),
            "system_feedback_access" === t &&
                (r = "bullhorn", s = "Feedback Access"),
            "system_trust_basic" === t &&
                (r = "chess-pawn", s = "Novice"),
            "system_trust_known" === t &&
                (r = "chess-rook", s = "Known"),
            "system_trust_intermediate" === t &&
                (r = "chess-rook", s = "Intermediate Trust"),
            "system_trust_trusted" === t &&
                (r = "chess-knight", s = "Trusted"),
            "system_trust_advanced" === t &&
                (r = "chess-knight", s = "Advanced Trust"),
            "system_trust_veteran" === t &&
                (r = "chess-king", s = "Veteran User"),
            "system_trust_legend" === t &&
                (r = "chess-king", s = "Legendary User"),
            "system_probable_troll" === t &&
                (r = "trash-alt", s = "Probable Troll"),
            "system_troll" === t &&
                (r = "toilet-paper", s = "Problem"),
            "admin_approved" === t &&
                (r = "thumbs-up", s = "Approved"),
            "admin_featured" === t &&
                (r = "camera-retro", s = "Featured"),
            "admin_community_spotlight" === t &&
                (r = "camera-retro", s = "Community Spotlight"),
            "admin_avatar_world" === t &&
                (r = "user-astronaut", s = "Avatar World"),
            "admin_hide_active" === t &&
                (r = "question", s = "Won't Appear in Active"),
            "admin_hide_new" === t &&
                (r = "question", s = "Won't Appear in New"),
            "admin_hide_popular" === t &&
                (r = "question", s = "Won't Appear in Popular"),
            "system_labs" === t &&
                (r = "flask", s = "System Labs"),
            "admin_approved" === t &&
                (r = "gavel", s = "Admin Approved"),
            "system_approved" === t &&
                (r = "check", s = "Approved"),
            "system_updated_recently" === t &&
                (r = "calendar-alt", s = "Updated Recently"),
            "system_created_recently" === t &&
                (r = "calendar", s = "Created Recently"),
            "admin_halloween_2018" === t &&
                (r = "ghost", s = "Halloween 2018"),
            "admin_halloween_2019" === t &&
                (r = "ghost", s = "Halloween 2019"),
            "admin_christmas_2018" === t &&
                (r = "tree", s = "Christmas 2018"),
            "admin_christmas_2019" === t &&
                (r = "tree", s = "Christmas 2019"),
            <Badge className={css(_templateObject())}>
                <Link to={"/home/search/tag:" + t}>
                    <Icon name={r} title={s} />
                    {!a &&
                        <span> s</span>
                    }
                </Link>
            </Badge>
